import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { UseMutationReturnType } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import * as Sentry from '@sentry/vue';
import { useAuthStore } from '@/store/auth';
import { SIGN_OUT_MUTATION_KEY } from '@/constants/mutationKeys';
import { APP_ROUTES } from '@/constants/routes';
import { useSurveyStore } from '@/store/survey';
import { useGameStore } from '@/store/game';

/**
 * Sign-Out mutation.
 *
 * @returns The mutation object returned by `useMutation`.
 */
const useSignOutMutation = (): UseMutationReturnType<void, Error, void, unknown> => {
  const authStore = useAuthStore();
  const surveyStore = useSurveyStore();
  const gameStore = useGameStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: SIGN_OUT_MUTATION_KEY,
    mutationFn: async (): Promise<void> => {
      await authStore.roarfirekit.signOut();
    },
    onSuccess: async (): Promise<void> => {
      // Cancel all actively fetching queries.
      await queryClient.cancelQueries();

      // Reset store and delete persisted data. Persisted data should be cleared via the $reset but to be safe, we also
      // remove it manually from sessionStorage to prevent any issues.
      authStore.$reset();
      gameStore.$reset();
      surveyStore.$reset();
      sessionStorage.removeItem('authStore');
      sessionStorage.removeItem('surveyStore');
      sessionStorage.removeItem('gameStore');

      // Clear the query client to remove all cached data.
      queryClient.clear();

      // Re-initialize Firekit. This is necessary to ensure that Firekit is properly reset after
      // sign-out in order to allow a new user to sign in.
      await authStore.initFirekit();

      // Redirect to sign-in page.
      router.push({ path: APP_ROUTES.SIGN_IN });
    },
    onError: (err: Error): void => {
      Sentry.captureException(err);
    },
  });
};

export default useSignOutMutation;
