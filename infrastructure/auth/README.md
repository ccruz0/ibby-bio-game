# Ibby login + per-chapter progress (Cognito + HTTP API + Lambda + DynamoDB)

Stack: `ibby-auth-progress` (ap-southeast-1, account 634531197711). Plain CloudFormation + SAM transform with inline Lambda (no build step).

```bash
aws cloudformation deploy --profile carlos-sso --region ap-southeast-1 \
  --template-file infrastructure/auth/template.yaml --stack-name ibby-auth-progress \
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND
```
Outputs feed `.env.production` (VITE_COGNITO_DOMAIN, VITE_COGNITO_CLIENT_ID, VITE_PROGRESS_API_URL; public values, no secrets).

Frontend deploy: `npm run build`, sync `dist/` to `s3://ibby-bio-game-ccruz0`, invalidate CloudFront `E1JIIYC2XLOXNC` (`/index.html`, `/`).

- Cognito user pool (Lite tier), email + password, hosted UI, auth-code + PKCE public client.
- HTTP API with Cognito JWT authorizer: `GET /progress`, `PUT /progress/{chapter}`; CORS limited to the CloudFront site + localhost.
- Lambda `ibby-progress` (arm64, 128 MB) with only `dynamodb:Query` and `dynamodb:PutItem` on the table.
- DynamoDB `ibby-progress` on-demand, PK `user` (Cognito sub), SK `chapter` (episode id).

Rollback: `aws cloudformation delete-stack --stack-name ibby-auth-progress` (DynamoDB table and users are deleted) and redeploy the previous `dist/`.
