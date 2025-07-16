import * as api from '@/api'
import { initDynamicRoutes, generateRoutesByMenus } from '@/utils/router'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const userInfo = ref<Auth.TUserInfo>()

  const setAccessToken = (value: string | null) => {
    accessToken.value = value
  }

  const isLoginSuccess = computed(() => {
    return !!accessToken.value
  })

  const setUserInfo = (value: Auth.TUserInfo) => {
    userInfo.value = value
  }

  const menus = computed(() => {
    return userInfo.value?.menus
  })

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

  function logout() {
    return new Promise((resolve, reject) => {
      api
        .logout()
        .then((res) => {
          // 清除登录状态
          setAccessToken(null)
          setUserInfo({} as Auth.TUserInfo)

          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  function getUserInfo() {
    return new Promise((resolve, reject) => {
      api
        .getUserInfo()
        .then(async (res) => {
          setUserInfo(res)
          initDynamicRoutes(generateRoutesByMenus(res.menus))
          // 确保动态路由注册完成后Vue更新完成
          await nextTick()
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
    isLoginSuccess,
  }
})
