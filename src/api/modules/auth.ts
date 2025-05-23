import request from '@/utils/request'
import type { RouteRecordRaw } from 'vue-router'

export const login = (data: Auth.TLoginParams): Promise<Auth.TLoginData> => {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export const getUserInfo = (): Promise<{
  userInfo: Auth.TUserInfo
  buttons: string[]
  menus: RouteRecordRaw[]
}> => {
  return request.get('/auth/userInfo')
}
