import type { Router } from 'vue-router'

import { useAuthStore } from '@/stores'
export const loginPath = '/login'

export const whiteList = [loginPath]

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
          // 使用nextTick确保动态路由注册完成且Vue更新完成后再跳转
          await nextTick()
          next({ path: to.path, query: to.query })
        } else {
          next()
        }
      }
    } else {
      // 如果是白名单，则直接放行
      if (whiteList.includes(to.path)) {
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
