# LEVANTE PLATFORTM

levante-platform integrates firebase-functions and levante-dashboard into a single repository.

## How to setup local dev environment:

### Install dependencies and build projects:

`npm install`

`npm run build:firebase`

### Run the development server:

`npm run dev`

### Seed Firebase Emulator data:

**Keep the server running**, and in another terminal window, run:

`npm run emulator:seed`

## Repository Structure

```
/apps
    /levante-dashboard
    /levante-firebase-functions
        /functions
            /levante-admin
            /levante-assessment
```
