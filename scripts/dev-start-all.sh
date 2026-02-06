#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_DIR="${ROOT_DIR}/.dev-logs"
EMULATOR_LOG="${LOG_DIR}/emulator.log"
DASHBOARD_LOG="${LOG_DIR}/dashboard.log"
RESET=0

for arg in "$@"; do
  case "$arg" in
    --reset)
      RESET=1
      ;;
    *)
      echo "Unknown option: $arg"
      echo "Usage: $0 [--reset]"
      exit 1
      ;;
  esac
done

mkdir -p "$LOG_DIR"

is_port_open() {
  local host="$1"
  local port="$2"
  if command -v nc >/dev/null 2>&1; then
    nc -z "$host" "$port" >/dev/null 2>&1
  else
    (echo >"/dev/tcp/${host}/${port}") >/dev/null 2>&1
  fi
}

wait_for_port() {
  local host="$1"
  local port="$2"
  local name="$3"
  local timeout="${4:-30}"
  local start_time
  start_time="$(date +%s)"
  while ! is_port_open "$host" "$port"; do
    if [ $(( $(date +%s) - start_time )) -ge "$timeout" ]; then
      echo "Timed out waiting for ${name} on ${host}:${port}"
      return 1
    fi
    sleep 1
  done
  echo "${name} ready on ${host}:${port}"
  return 0
}

echo "==> Building functions"
(cd "${ROOT_DIR}/apps/server/levante-firebase-functions" && npm run build)

echo "==> Starting emulators (if not already running)"
if is_port_open 127.0.0.1 4001; then
  echo "Emulator UI already running."
else
  (cd "${ROOT_DIR}/apps/server/levante-firebase-functions" && npm run dev) >"$EMULATOR_LOG" 2>&1 &
  echo "Emulator logs: $EMULATOR_LOG"
fi

wait_for_port 127.0.0.1 4001 "Emulator UI" 60
wait_for_port 127.0.0.1 9199 "Auth emulator" 60
wait_for_port 127.0.0.1 8180 "Firestore emulator" 60
wait_for_port 127.0.0.1 5002 "Functions emulator" 60

echo "==> Seeding emulator data"
if [ "$RESET" -eq 1 ]; then
  (cd "${ROOT_DIR}/apps/server/levante-firebase-functions" && npm run emulator:clear)
fi
(cd "${ROOT_DIR}/apps/server/levante-firebase-functions" && npm run emulator:seed)

echo "==> Starting dashboard (if not already running)"
if is_port_open 127.0.0.1 5173; then
  echo "Dashboard already running on port 5173."
else
  (cd "${ROOT_DIR}/apps/client/levante-dashboard" && CROWDIN_API_TOKEN= npm run dev -- --host 0.0.0.0) >"$DASHBOARD_LOG" 2>&1 &
  echo "Dashboard logs: $DASHBOARD_LOG"
fi

wait_for_port 127.0.0.1 5173 "Dashboard" 60 || true

dashboard_url="http://localhost:5173/signin"
if [ -f "$DASHBOARD_LOG" ]; then
  local_line="$(grep -m1 -E "Local:" "$DASHBOARD_LOG" || true)"
  if [ -n "$local_line" ]; then
    base_url="$(echo "$local_line" | awk '{print $NF}')"
    dashboard_url="${base_url%/}/signin"
  fi
fi

echo "==> Opening browser: $dashboard_url"
if command -v cmd.exe >/dev/null 2>&1; then
  cmd.exe /c start "" "$dashboard_url" >/dev/null 2>&1 || true
elif command -v powershell.exe >/dev/null 2>&1; then
  powershell.exe -NoProfile -Command "Start-Process '${dashboard_url}'" >/dev/null 2>&1 || true
else
  echo "Open this URL manually: $dashboard_url"
fi

if grep -qi microsoft /proc/version 2>/dev/null; then
  cat <<'EOF'
NOTE: If the Windows browser shows emulator connection errors,
you may need to set up port proxy rules for 9199/8180/5002,
or use the Cursor browser/WSL browser.
EOF
fi
