# Cherrie Query Migration Evaluation

## Executive summary
Cherrie is the right direction: moving large query surfaces from client REST calls into backend callables is a **material security improvement** and a **high‑probability performance win** when callables reduce payloads and round trips. Performance gains are **conditional**, but the migration gives us the tools to make them real (server‑side filtering, aggregation, and caching). The cost is operational complexity and permission‑parity risk, which is manageable with per‑domain rollout, parity tests, and canaries. Net: we should **adopt cherrie** and enable it progressively.

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
**Yes.** The security gain is real, and the performance upside is meaningful for the high‑traffic query paths this migration targets. The remaining risks (permission parity and query mismatches) are engineering problems we can and should solve with incremental rollout and parity validation.

## Improvements I recommend
1. **Domain‑scoped flags** with progressive enablement (already implemented).
2. **Parity tests** that compare REST vs callable results for each domain.
3. **Access tests** for admin/site_admin/research_assistant across each domain in emulator.
4. **Canary rollout** by site or role for each domain before global enablement.
5. **Latency monitoring** for callable cold starts and error rates.
6. **Migration metadata** in responses to trace mismatches quickly.

## Recommendation
- Adopt cherrie as the migration lane and move forward with production enablement **domain by domain**.
- Start with the lowest‑risk domain and expand once parity + access tests pass.
- Treat monitoring and rollback readiness as gates, not suggestions.
