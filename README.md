# LEVANTE PLATFORTM

levante-platform integrates firebase-functions and levante-dashboard into a single repository.

## How to setup local dev environment

### Install dependencies and build projects

`npm install`

`npm run build:firebase-functions`

### Run the development servers

`npm run dev`

### Seed Firebase Emulator data

**Keep the server running**, and in another terminal window, run:

`npm run emulator:seed`

### Local utility scripts

Clean ports used by local services:

`npm run clean:ports`

Create symlinks to local dashboard/functions repos (auto-detects common folders):

`node scripts/setup-symlinks.js`

You can override the auto-detected locations with:

`DASHBOARD_REPO="/path/to/levante-dashboard" FUNCTIONS_REPO="/path/to/levante-firebase-functions" node scripts/setup-symlinks.js`

## Repository Structure

```
/apps
    /client
        /levante-dashboard
    /server
        /levante-firebase-functions
            /functions
                /levante-admin
```

## Servers

```
levante-dashboard: https://localhost:5173/
levante-firebase-functions: http://127.0.0.1:4001/
```
