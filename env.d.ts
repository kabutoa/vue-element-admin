/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_PORT: number
  readonly VITE_API_PREFIX: string
  readonly VITE_MOCK_URL: string
  readonly VITE_OPEN_CDN: string
  readonly VITE_CDN_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
