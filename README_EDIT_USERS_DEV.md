# Edit Users Dev Guide

This guide explains how to check out the correct branches, start the emulators, seed data, and run the dashboard so you can develop and debug the Edit Users modal (school/class/teacher/caregiver links + date ranges).

## Prerequisites

- Node.js and npm
- Firebase CLI installed (`firebase --version`)
- WSL users: run commands from the WSL terminal

## Repo setup and branches

1) From repo root:
```
git checkout feat/edit-users-links
```

2) Update submodules and check out the same branch inside each:
```
git submodule update --init --recursive

cd apps/client/levante-dashboard
git checkout feat/edit-users-links
cd -

cd apps/server/levante-firebase-functions
git checkout feat/edit-users-links
cd -
```

If the branch does not exist in the submodule, create it:
```
git checkout -b feat/edit-users-links
```

## Start everything (recommended)

From repo root:
```
bash scripts/dev-start-all.sh --reset
```

This script:
- builds functions
- starts emulators
- clears + seeds emulator data
- starts the dashboard
- opens the login URL

## Manual start (if you prefer)

### 1) Build functions
From `apps/server/levante-firebase-functions`:
```
npm run build
```

### 2) Start emulators (keep running)
Same folder:
```
npm run dev
```

You should see:
```
Emulator UI running on http://127.0.0.1:4001
```

### 3) Clear and seed data
In another terminal (same folder):
```
npm run emulator:clear
npm run emulator:seed
```

### 4) Start dashboard
From `apps/client/levante-dashboard`:
```
unset CROWDIN_API_TOKEN
npm run dev
```

Use the “Local:” URL printed by Vite (usually `http://localhost:5173`).

## Login credentials (seeded)

Use the seeded test accounts:
- `superadmin@levante.test` / `super123`
- `admin@levante.test` / `admin123`
- `siteadmin@levante.test` / `site123`
- `ra@levante.test` / `ras123`
- `teacher@levante.test` / `teach123`
- `teacher2@levante.test` / `teach123`
- `student@levante.test` / `student123`
- `parent@levante.test` / `parent123`
- `parent2@levante.test` / `parent123`

Stay on `/signin` — the “Admin” link only toggles Google sign‑in.

## Testing the Edit Users modal

1) Navigate to **Groups → List Groups**, select a district/school.
2) Open **List Users** and click **Edit** on a student.
3) Verify fields:
   - Email (read‑only)
   - School, Class (dropdowns)
   - Birthday month/year (defaults from `birthMonth`/`birthYear`)
   - Linked Teachers (current/past + add)
   - Linked Caregivers (current/past + add)
4) Save and confirm updates in emulator:
   - `users/{uid}.schools.current`, `classes.current`
   - `users/{uid}.teacherLinks.current`, `parentLinks.current`
   - `users/{teacherUid}.childLinks.current`

## Updated schema expectations

- Org associations store date ranges: `dates.{orgId} = { from, to }`
- Link maps use the same structure:
  - `teacherLinks`, `parentLinks`, `childLinks`

## Troubleshooting

### Emulator UI doesn’t open
- Confirm `npm run dev` is running in `apps/server/levante-firebase-functions`.
- Check `http://127.0.0.1:4001`.

### Dashboard can’t reach emulator (Windows browser)
If you see `127.0.0.1:9199 ... ERR_CONNECTION_REFUSED`, you’re likely hitting the WSL host mismatch.

Options:
- Use the Cursor/WSL browser (works with 127.0.0.1)
- Or set Windows port proxy rules to WSL IP for ports `9199`, `8180`, `5002`, `5001`

### Dashboard won’t start
If `npm run dev` fails due to Crowdin:
```
unset CROWDIN_API_TOKEN
npm run dev
```

## Useful paths

- UI modal: `apps/client/levante-dashboard/src/components/EditUsersForm.vue`
- List users page: `apps/client/levante-dashboard/src/pages/users/ListUsers.vue`
- Edit users callable: `apps/server/levante-firebase-functions/functions/levante-admin/src/edit-users.ts`
- Linking logic: `apps/server/levante-firebase-functions/functions/levante-admin/src/user-linking.ts`
- Seed scripts: `apps/server/levante-firebase-functions/emulator_scripts/seed-emulator.js`
