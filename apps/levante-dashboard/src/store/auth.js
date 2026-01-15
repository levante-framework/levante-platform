import { acceptHMRUpdate, defineStore } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';
import _get from 'lodash/get';
import { initNewFirekit } from '../firebaseInit';
import { AUTH_SSO_PROVIDERS } from '../constants/auth';
import { FIRESTORE_BASE_URL } from '@/constants/firebase';
import posthogInstance from '@/plugins/posthog';
import { logger } from '@/logger';

export const useAuthStore = () => {
  const store = defineStore('authStore', {
    id: 'authStore',
    state: () => {
      return {
        spinner: false,
        firebaseUser: {
          adminFirebaseUser: null,
        },
        adminOrgs: null,
        roarfirekit: null,
        firekitInitError: null,
        userData: null,
        userClaims: null,
        routeToProfile: false,
        ssoProvider: null,
        showOptionalAssessments: false,
        adminAuthStateListener: null,
      };
    },
    getters: {
      uid: (state) => {
        return state.firebaseUser.adminFirebaseUser?.uid;
      },
      roarUid: (state) => {
        return state.userClaims?.claims?.roarUid;
      },
      email: (state) => {
        return state.firebaseUser.adminFirebaseUser?.email;
      },
      isUserAuthedAdmin: (state) => {
        return Boolean(state.firebaseUser.adminFirebaseUser);
      },
      isAuthenticated: (state) => {
        return Boolean(state.firebaseUser.adminFirebaseUser);
      },
      isFirekitInit: (state) => {
        return state.roarfirekit?.initialized;
      },
      isUserAdmin: (state) => {
        return Boolean(state.userClaims?.claims?.super_admin || state.userClaims?.claims?.admin);
      },
      isUserSuperAdmin: (state) => Boolean(state.userClaims?.claims?.super_admin),
    },
    actions: {
      async fetchFirestoreDoc(collection, docId) {
        if (!collection || !docId) return null;

        const projectId = _get(this.roarfirekit, 'roarConfig.admin.projectId');
        if (!projectId) return null;

        const axiosOptions = _get(this.roarfirekit, 'restConfig.admin') ?? {};
        axiosOptions.baseURL = FIRESTORE_BASE_URL;
        if (!axiosOptions.headers?.Authorization) {
          const authUser = this.roarfirekit?.admin?.auth?.currentUser;
          if (authUser) {
            const token = await authUser.getIdToken();
            axiosOptions.headers = { ...(axiosOptions.headers ?? {}), Authorization: `Bearer ${token}` };
          }
        }

        const client = axios.create(axiosOptions);
        const url = `projects/${projectId}/databases/(default)/documents/${collection}/${docId}`;
        const { data } = await client.get(url);

        const convertValues = (value) => {
          const passThroughKeys = [
            'nullValue',
            'booleanValue',
            'timestampValue',
            'stringValue',
            'bytesValue',
            'referenceValue',
            'geoPointValue',
          ];
          const numberKeys = ['integerValue', 'doubleValue'];
          return Object.entries(value)
            .map(([key, raw]) => {
              if (passThroughKeys.includes(key)) return raw;
              if (numberKeys.includes(key)) return Number(raw);
              if (key === 'arrayValue') return (raw.values ?? []).map((item) => convertValues(item));
              if (key === 'mapValue') {
                return Object.fromEntries(
                  Object.entries(raw.fields ?? {}).map(([mapKey, mapValue]) => [mapKey, convertValues(mapValue)]),
                );
              }
              return undefined;
            })
            .find((v) => v !== undefined);
        };

        return {
          id: docId,
          collection,
          ...Object.fromEntries(Object.entries(data.fields ?? {}).map(([k, v]) => [k, convertValues(v)])),
        };
      },
      async hydrateUserContext(uid) {
        try {
          let claimsDoc = null;
          for (let attempt = 0; attempt < 3; attempt += 1) {
            // Retry a few times in case auth headers/config are still initializing.
            claimsDoc = await this.fetchFirestoreDoc('userClaims', uid);
            if (claimsDoc) break;
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          if (claimsDoc) this.setUserClaims(claimsDoc);

          const roarUid = claimsDoc?.claims?.roarUid;
          if (roarUid) {
            const userDoc = await this.fetchFirestoreDoc('users', roarUid);
            if (userDoc) this.setUserData(userDoc);
          }
        } catch (error) {
          console.warn('Failed to hydrate user context:', error);
        }
      },
      async initFirekit() {
        try {
          this.roarfirekit = await initNewFirekit();
          this.firekitInitError = null;
          this.setAuthStateListeners();
        } catch (error) {
          // @TODO: Improve error handling as this is a critical error.
          console.error('Error initializing Firekit:', error);
          this.firekitInitError = error instanceof Error ? error.message : String(error);
        }
      },
      setAuthStateListeners() {
        this.adminAuthStateListener = onAuthStateChanged(this.roarfirekit?.admin.auth, async (user) => {
          if (user) {
            this.localFirekitInit = true;
            this.firebaseUser.adminFirebaseUser = user;
            logger.setUser(user);
            await this.hydrateUserContext(user.uid);
          } else {
            this.firebaseUser.adminFirebaseUser = null;
            logger.setUser(null);
            this.userClaims = null;
            this.userData = null;
          }
        });
      },
      async completeAssessment(adminId, taskId) {
        await this.roarfirekit.completeAssessment(adminId, taskId);
      },
      async getLegalDoc(docName) {
        return await this.roarfirekit.getLegalDoc(docName);
      },
      async logInWithEmailAndPassword({ email, password }) {
        if (this.isFirekitInit) {
          return this.roarfirekit
            .logInWithEmailAndPassword({ email, password })
            .then(() => {})
            .catch((error) => {
              console.error('Error signing in:', error);
              throw error;
            });
        }
      },
      async initiateLoginWithEmailLink({ email }) {
        if (this.isFirekitInit) {
          const redirectUrl = `${window.location.origin}/auth-email-link`;
          return this.roarfirekit.initiateLoginWithEmailLink({ email, redirectUrl }).then(() => {
            window.localStorage.setItem('emailForSignIn', email);
          });
        }
      },
      async signInWithEmailLink({ email, emailLink }) {
        if (this.isFirekitInit) {
          return this.roarfirekit.signInWithEmailLink({ email, emailLink }).then(() => {
            window.localStorage.removeItem('emailForSignIn');
          });
        }
      },
      async signInWithGooglePopup() {
        if (this.isFirekitInit) {
          return this.roarfirekit.signInWithPopup(AUTH_SSO_PROVIDERS.GOOGLE);
        }
      },
      async signInWithGoogleRedirect() {
        return this.roarfirekit.initiateRedirect(AUTH_SSO_PROVIDERS.GOOGLE);
      },
      async initStateFromRedirect() {
        this.spinner = true;
        const enableCookiesCallback = () => {
          const router = useRouter();
          router.replace({ name: 'EnableCookies' });
        };
        if (this.isFirekitInit) {
          return await this.roarfirekit.signInFromRedirectResult(enableCookiesCallback).then((result) => {
            // If the result is null, then no redirect operation was called.
            if (result !== null) {
              this.spinner = true;
            } else {
              this.spinner = false;
            }
          });
        }
      },
      async forceIdTokenRefresh() {
        await this.roarfirekit.forceIdTokenRefresh();
      },
      async sendMyPasswordResetEmail() {
        if (this.email) {
          return await this.roarfirekit.sendPasswordResetEmail(this.email).then(() => {
            return true;
          });
        } else {
          console.warn('Logged in user does not have an associated email. Unable to send password reset email');
          return false;
        }
      },
      async createUsers(userData) {
        return this.roarfirekit.createUsers(userData);
      },
      async signOut() {
        console.log('PostHog Reset (explicit signOut)');
        posthogInstance.reset();
        if (this.isFirekitInit) {
          return this.roarfirekit.signOut();
        }
      },
      setUserData(userData) {
        this.userData = userData;
      },
      setUserClaims(userClaims) {
        this.userClaims = userClaims;
      },
    },
    persist: {
      storage: sessionStorage,
      paths: ['firebaseUser', 'ssoProvider'],
      debug: false,
    },
  });
  return store();
};

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
