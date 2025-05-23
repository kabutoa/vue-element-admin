import * as api from '@/api'
import { initDynamicRoutes, generateRoutesByMenus } from '@/utils/router'
import type { RouteRecordRaw } from 'vue-router'
export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const userInfo = ref<Auth.TUserInfo>()
  const buttons = ref<string[]>([])
  const menus = ref<RouteRecordRaw[]>()

  const setAccessToken = (value: string) => {
    accessToken.value = value
  }
  const setUserInfo = (value: Auth.TUserInfo) => {
    userInfo.value = value
  }

  const setButtons = (value: string[]) => {
    buttons.value = value
  }
  const setMenus = (value: RouteRecordRaw[]) => {
    menus.value = value
  }

  function login(data: Auth.TLoginParams) {
    return new Promise((resolve, reject) => {
      api
        .login(data)
        .then((res) => {
          setAccessToken(res.accessToken)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  function logout() {}

  function getUserInfo() {
    return new Promise((resolve, reject) => {
      api
        .getUserInfo()
        .then((res) => {
          const { userInfo, buttons, menus } = res
          setUserInfo(userInfo)
          setButtons(buttons)
          setMenus(menus)
          initDynamicRoutes(generateRoutesByMenus(menus))
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return {
    accessToken,
    setAccessToken,
    login,
    userInfo,
    setUserInfo,
    logout,
    getUserInfo,
    menus,
    buttons,
  }
})
