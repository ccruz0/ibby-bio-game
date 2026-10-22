/// <reference types="vite/client" />

declare module "*.svg?raw" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_COGNITO_DOMAIN?: string;
  readonly VITE_COGNITO_CLIENT_ID?: string;
  readonly VITE_PROGRESS_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
