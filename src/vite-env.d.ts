/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_URL: string;
  readonly CAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
