# Cherrie Query Migration Evaluation

## Executive summary
Cherrie moves large query surfaces from client REST calls into backend callables. Compared to current `main`, this is a **material security improvement** and can be a **performance improvement** when it reduces overfetching and round trips. The cost is operational complexity and higher risk of permission parity issues. Adopting cherrie is worth it **only if** we can prove query parity and access control per domain and roll out incrementally with a rollback path.

## How cherrie changes the system vs main
- **Data path**: client REST queries → callable → Firestore.
- **Authorization**: centralized in functions instead of client‑side query logic.
- **Rollout**: domain‑scoped flags enable incremental adoption.
- **Testing need**: parity + access tests are required to avoid regressions.

## Impact comparison (cherrie vs main)
### Security
- **Cherrie is stronger**: Removes direct client access to REST endpoints and centralizes authorization.
- **Main is weaker**: Client‑side REST access spreads policy enforcement and increases exposure.
- **New risk**: If claims/roles are inconsistent, authorization failures can become systemic.

### Performance
- **Cherrie can be faster**: Server‑side aggregation and filtering reduce payload and client work.
- **Cherrie can be slower**: Extra hop + cold starts can increase latency for small queries.
- **Main is predictable**: Fewer hops but more overfetching and client work.

### Reliability & operability
- **Cherrie adds complexity**: More moving parts and failure modes.
- **Cherrie adds observability**: Server logs and metrics give clearer insight than client REST calls.
- **Main is simpler**: Fewer operational surfaces, but less control.

## Is cherrie worth adopting?
**Yes, conditionally.** The security gain is real, and performance can improve for complex queries. The adoption risk is permission parity and query mismatches; these must be validated before broad rollout.

## Improvements I recommend
1. **Domain‑scoped flags** with progressive enablement (already implemented).
2. **Parity tests** that compare REST vs callable results for each domain.
3. **Access tests** for admin/site_admin/research_assistant across each domain in emulator.
4. **Canary rollout** by site or role for each domain before global enablement.
5. **Latency monitoring** for callable cold starts and error rates.
6. **Migration metadata** in responses to trace mismatches quickly.

## Recommendation
- Keep cherrie as the migration lane, rebased frequently to reduce drift.
- Enable only one domain at a time and require parity + access tests before enabling the next.
- Do not enable any domain in production without monitoring and rollback readiness.
