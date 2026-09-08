# AWS backend (Cognito anonymous + DynamoDB + API Gateway/Lambda)

**Status: NOT DEPLOYED.** This directory is infrastructure-as-code only — nothing here
has been applied to any AWS account. The game runs fully client-side against
localStorage until someone deploys this stack (see spec-D4, Rollback Plan).

## What's here

- `template.yaml` — AWS SAM template: Cognito Identity Pool (unauthenticated access
  only, no passwords), a single DynamoDB table (`player_progress`, on-demand billing),
  an API Gateway REST API, and 3 Lambda functions.
- `lambda/` — handler stubs for the 3 endpoints defined in the spec
  (`POST /progress/init`, `POST /progress/battle-complete`, `GET /progress/session`).

## Cost profile if deployed (Conductor OK required before deploying)

All resources are configured for pay-per-use / free-tier-eligible pricing at
playtest scale (Ibby + 5–10 classmates, single episode):

| Resource | Pricing model | Expected cost at this scale |
|---|---|---|
| Cognito Identity Pool (unauthenticated) | Free — no MAU charge for unauthenticated identities under standard tier | $0 |
| DynamoDB (on-demand) | Pay per request, no fixed cost, free tier covers 25 WCU/RCU-equivalent | ~$0 (a few cents/month worst case) |
| API Gateway (REST, low volume) | First 1M requests/month free (12-mo free tier) or ~$3.50/million after | ~$0 |
| Lambda | 1M free requests/month + 400,000 GB-seconds free, always | ~$0 |

None of this is free *indefinitely* (Cognito/API Gateway/Lambda free tiers are
12-month-account or always-free depending on resource) — flagging so Conductor can
confirm before `sam deploy` is ever run. **Do not deploy without explicit Conductor OK.**

## Deploying (when authorized)

```bash
cd infrastructure
sam build
sam deploy --guided   # creates a stack; review the changeset before confirming
```

Requires AWS credentials (`aws sts get-caller-identity` must succeed) — not configured
in this environment as of this scaffold (SSO token missing).
