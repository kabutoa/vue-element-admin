import type { Router } from 'vue-router'

import { useAuthStore } from '@/stores'
export const loginPath = '/login'

export const setupGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    window.NProgress.start()
    const authStore = useAuthStore()
    // 若已登录，则跳转至首页
    if (authStore.accessToken) {
      // 若访问的是登录页，则跳转至首页
      if (to.path === loginPath) {
        next({ path: '/' })
      } else {
        // 从后端获取路由信息
        if (!authStore.menus?.length) {
          await authStore.getUserInfo()
          next({ path: to.path, query: to.query })
        } else {
          next()
        }
      }
    } else {
      // 如果访问的是登录页，则直接放行
      if (to.path === loginPath) {
        next()
      } else {
        // 否则跳转至登录页，并携带当前路径
        next({ path: `${loginPath}?redirect=${to.fullPath}` })
      }
    }
  })

  router.afterEach((to) => {
    window.NProgress.done()
    if (to.meta.title) {
      document.title = `${to.meta.title} - Slerf Admin`
    }
  })
}
