import type { App } from 'vue'

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { staticRoutes, defaultRoutes } from './routes'
import { setupGuard } from './guard'

export const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_MODE === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE_URL)
      : createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [...staticRoutes, ...defaultRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true,
})

export const setupRouter = async (app: App) => {
  setupGuard(router)
  app.use(router)
  await router.isReady()
}
