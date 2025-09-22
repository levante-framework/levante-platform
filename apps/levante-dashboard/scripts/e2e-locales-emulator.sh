#!/usr/bin/env bash
set -uo pipefail
set -x

PORT=5173
EMU_UI_PORT=4001
AUTH_PORT=9199
FS_PORT=8180

cleanup() {
  set +e  # Disable exit on error for cleanup
  (test -f /tmp/vite.pid && kill "$(cat /tmp/vite.pid)" 2>/dev/null) || true
  (test -f /tmp/firebase.pid && kill "$(cat /tmp/firebase.pid)" 2>/dev/null) || true
  pkill -f "vite --force --host" 2>/dev/null || true
  return 0  # Always return success
}

kill_on_port() {
  local port="$1"
  if command -v lsof >/dev/null 2>&1; then
    lsof -ti:"$port" | xargs -r kill -9 2>/dev/null || true
  elif command -v fuser >/dev/null 2>&1; then
    fuser -k "${port}/tcp" 2>/dev/null || true
  else
    echo "WARN: neither lsof nor fuser available to free port ${port}" >&2
  fi
}

# Clean up any previous runs and free ports
cleanup || true
kill_on_port "$PORT"
kill_on_port "$EMU_UI_PORT"
kill_on_port "$AUTH_PORT"
kill_on_port "$FS_PORT"

# Ensure ports are free
for p in "$PORT" "$EMU_UI_PORT" "$AUTH_PORT" "$FS_PORT"; do
  for i in $(seq 1 30); do
    (echo > /dev/tcp/127.0.0.1/$p) >/dev/null 2>&1 && { sleep 1; } || break
  done
done

# Start Firebase emulators (auth + firestore)
echo "Starting Firebase emulators..."
./node_modules/.bin/firebase emulators:start \
  --only auth,firestore \
  --project levante-admin-dev \
  --config firebase.json \
  > /tmp/firebase-emu.log 2>&1 &
firebase_pid=$!
echo $firebase_pid > /tmp/firebase.pid
echo "Firebase emulators started with PID $firebase_pid"

# Start Vite dev server over HTTP with emulator enabled, locked to 5173
echo "Starting Vite dev server..."
VITE_HTTPS=FALSE \
VITE_LEVANTE=TRUE \
VITE_FIREBASE_PROJECT=DEV \
VITE_EMULATOR=TRUE \
./node_modules/.bin/vite --force --host --port "$PORT" \
  > /tmp/vite.log 2>&1 &
vite_pid=$!
echo $vite_pid > /tmp/vite.pid
echo "Vite dev server started with PID $vite_pid"

# Wait for Firebase Emulator UI and Vite to be ready
echo "Waiting for Firebase Emulator UI on port ${EMU_UI_PORT}..."
firebase_ready=false
for i in $(seq 1 60); do
  if ! kill -0 $firebase_pid 2>/dev/null; then
    echo "Firebase emulator process died"
    echo "--- Firebase emulator log ---"
    tail -n 50 /tmp/firebase-emu.log || true
    exit 1
  fi
  if curl -sSf http://127.0.0.1:${EMU_UI_PORT} >/dev/null 2>&1; then
    echo "Firebase Emulator UI ready"
    firebase_ready=true
    break
  fi
  sleep 1
done

if [ "$firebase_ready" = "false" ]; then
  echo "Firebase emulator failed to become ready within 60 seconds"
  echo "--- Firebase emulator log ---"
  tail -n 50 /tmp/firebase-emu.log || true
  exit 1
fi

echo "Waiting for Vite dev server on port ${PORT}..."
vite_ready=false
for i in $(seq 1 60); do
  if ! kill -0 $vite_pid 2>/dev/null; then
    echo "Vite dev server process died"
    echo "--- Vite log ---"
    tail -n 50 /tmp/vite.log || true
    exit 1
  fi
  if curl -sSf http://localhost:${PORT} >/dev/null 2>&1; then
    echo "Vite dev server ready"
    vite_ready=true
    break
  fi
  sleep 1
done

if [ "$vite_ready" = "false" ]; then
  echo "Vite dev server failed to become ready within 60 seconds"
  echo "--- Vite log ---"
  tail -n 50 /tmp/vite.log || true
  exit 1
fi

# Additional wait for Vite to fully compile and serve the app
echo "Waiting additional 10 seconds for Vite to fully compile..."
sleep 10

SEED="${E2E_SEED:-FALSE}"
if [ "$SEED" = "TRUE" ] || [ "$SEED" = "true" ]; then
  # Seed emulator user (idempotent)
  curl -sS -X POST \
    -H 'Content-Type: application/json' \
    -d '{"email":"student@levante.test","password":"student123","returnSecureToken":true}' \
    "http://127.0.0.1:${AUTH_PORT}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=dummy" \
    >/dev/null 2>&1 || true
fi

# Run Cypress locales emulator spec
echo "Running Cypress spec: ${E2E_SPEC:-cypress/e2e/locales-emulator.cy.ts}"
SPEC_PATH="${E2E_SPEC:-cypress/e2e/locales-emulator.cy.ts}"
E2E_USE_ENV=TRUE \
E2E_BASE_URL="http://localhost:${PORT}/signin" \
E2E_TEST_EMAIL=student@levante.test \
E2E_TEST_PASSWORD=student123 \
./node_modules/.bin/cypress run --e2e --spec "$SPEC_PATH" --config baseUrl="http://localhost:${PORT}"
code=$?

if [ "$code" -ne 0 ]; then
  echo '--- Vite last lines ---'
  tail -n 120 /tmp/vite.log || true
  echo '--- Firebase last lines ---'
  tail -n 120 /tmp/firebase-emu.log || true
fi

# Explicit cleanup before exit
cleanup
exit "$code"


