import * as ElementPlusIcons from '@element-plus/icons-vue'
import type { App } from 'vue'

export function install(app: App) {
  for (const [key, component] of Object.entries(ElementPlusIcons)) {
    app.component(key, component)
  }
}
