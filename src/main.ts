import { createApp, type App } from 'vue'

import { setupRouter } from './router'
import { setupStore } from './stores'

import AppLoading from '@/components/app-loading/index.vue'

import AppContainer from './App.vue'

const setupApp = async () => {
  const appLoading = createApp(AppLoading)
  appLoading.mount('#app-loading')

  const app = createApp(AppContainer)

  Object.values(
    import.meta.glob<{ install: (app: App) => void }>('./plugins/*.ts', {
      eager: true,
    }),
  ).map((i) => app.use(i))

  setupStore(app)

  await setupRouter(app)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  appLoading.unmount()

  app.mount('#app')
}

setupApp()
