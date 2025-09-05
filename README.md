# LEVANTE PLATFORTM

levante-platform integrates firebase-functions and levante-dashboard into a single repository.

## How to setup local dev environment:

### Install dependencies and build projects:

`npm install`

`npm run build`

### Run the development server:

`npm run dev`

### Seed Firebase Emulator data:

Keep the server running, and in another terminal window, run:

`npm run emulator:seed`

## Dashboard Repository

- Levante Dashboard https://github.com/levante-framework/levante-dashboard

## Firebase Functions Repository

- Firebase Functions https://github.com/levante-framework/levante-firebase-functions

## To do list:

### DONE

- Setup repo details (turbo)
- Fix node version
- Fix builds
- Fix bcrypt types bug
- Fix dev env
- Bring e2e
- Finish infrastructure
- Integrate with CY Team Panel
- Add cleaning scripts

### TODO

- Update inner repos
- Fix typescript, firebase-functions and primeicons in the updated versions as we did in the POC
- Run pipeline tests at GH
- Check husky (maybe I just bypassed it when evolving into POC development)
