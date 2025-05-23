interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_API_PREFIX: string
  readonly VITE_MOCK_URL: string
  readonly VITE_PORT: number
  readonly VITE_OPEN_CDN: boolean
  readonly VITE_CDN_URL: string
  readonly VITE_ROUTER_MODE: 'hash' | 'history'
  readonly VITE_AUTHENTICATION: 'jwt' | 'cookie'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
