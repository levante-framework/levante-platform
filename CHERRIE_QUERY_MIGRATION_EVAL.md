# Cherrie Query Migration Evaluation

## Scope of changes completed
- Added backend callables for org/user queries and wired roarfirekit + dashboard helpers behind a feature flag.
- Added minimal query validator tests in functions.
- Introduced a feature flag in the dashboard to toggle backend query usage.

## Value assessment
- **Security**: Moving direct Firestore REST queries behind Cloud Functions reduces client-side exposure and centralizes permission checks.
- **Maintainability**: A single backend surface area for query logic reduces duplication between REST query builders and composables.
- **Performance**: Backend queries can return tailored data for cache updates, reducing full invalidations.

## Risks and gaps
- **Migration breadth**: Only org/user query paths are migrated; assignments/runs/tasks/administrations still use direct REST calls.
- **Permission parity**: Some legacy adminOrg access paths may differ from new permission-system expectations and need audit.
- **Testing depth**: Added tests are minimal; emulator-backed integration tests for access control and data shape are still needed.

## Recommendation
- **Proceed** with a phased rollout using `VITE_USE_BACKEND_MIGRATED_QUERIES` after expanding coverage to remaining query modules.
- **Do not enable** the backend flag in production until:
  - Emulator integration tests validate access control for each migrated query.
  - Query parity comparisons confirm identical results between old and new paths.
  - Monitoring is in place for latency/error regressions.

## Next steps (suggested)
1. Migrate `assignments`, `runs`, and `tasks` query helpers to backend callables.
2. Add emulator-based tests for each callable with representative legacy data fixtures.
3. Run a controlled rollout: internal users → pilot site → full rollout.
