declare namespace Auth {
  type TUserInfo = {
    userId: number
    userName: string
    nickName: string
    avatar: string
  }

  type TLoginParams = {
    username: string
    password: string
  }

  type TLoginData = {
    accessToken: string
    refreshToken: string
  }
}
