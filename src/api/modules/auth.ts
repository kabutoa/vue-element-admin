import request from '@/utils/request'

export const login = (data: Auth.TLoginParams): Promise<Auth.TLoginData> => {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export const logout = (): Promise<void> => {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

export const getUserInfo = (): Promise<Auth.TUserInfo> => {
  return request.get('/auth/userInfo')
}
