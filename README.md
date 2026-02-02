# LEVANTE PLATFORTM

levante-platform integrates firebase-functions and levante-dashboard into a single repository.

## How to setup local dev environment

### Install dependencies and build projects

`npm install`

`git submodule update --init --recursive`

`npm run build:firebase-functions`

### Run the development servers

`npm run dev`

### Seed Firebase Emulator data

**Keep the server running**, and in another terminal window, run:

`npm run emulator:seed`

### Local utility scripts

Clean ports used by local services:

`npm run clean:ports`

### Script docs

Schema docs and integrity checks:

`scripts/README.md`

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
