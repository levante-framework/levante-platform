import { RoarFirekit } from '@levante-framework/firekit';
import levanteFirebaseConfig from './config/firebaseLevante';
import { isLevante } from './helpers';
import firebaseJSON from '../firebase.json';

const emulatorConfig = import.meta.env.VITE_EMULATOR ? firebaseJSON.emulators : undefined;
const appCheckDebugToken = import.meta.env.VITE_APPCHECK_DEBUG_TOKEN;

const roarConfig = levanteFirebaseConfig;

export async function initNewFirekit(): Promise<RoarFirekit> {
  if (appCheckDebugToken) {
    // Required by Firebase App Check to use a debug token in local/dev environments.
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = appCheckDebugToken;
  }
  const firekit = new RoarFirekit({
    roarConfig,
    emulatorConfig,
    authPersistence: 'session',
    markRawConfig: {
      auth: false,
      db: false,
      functions: false,
    },
    verboseLogging: isLevante ? false : true,

    // The site key is used for app check token verification
    // The debug token is used to bypass app check for local development
    siteKey: roarConfig?.siteKey,
    debugToken: emulatorConfig ? 'test-debug-token' : appCheckDebugToken || roarConfig?.debugToken,
  });
  return await firekit.init();
}
