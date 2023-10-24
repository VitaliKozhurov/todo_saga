import { AppResponseType, axiosInstance } from '@/common'
import { AxiosResponse } from 'axios'

export class AuthApi {
  static login() {
    return axiosInstance.post<
      AppResponseType<LoginResponse>,
      AxiosResponse<AppResponseType<LoginResponse>>,
      LoginRequest
    >('auth/login')
  }

  static logout() {
    return axiosInstance.delete<AppResponseType, AxiosResponse<AppResponseType>>('auth/login')
  }

  static me() {
    return axiosInstance.get<
      AppResponseType<AuthMeResponse>,
      AxiosResponse<AppResponseType<AuthMeResponse>>
    >('auth/me')
  }
}

type AuthMeResponse = {
  email: string
  id: number
  login: string
}

type LoginResponse = { userId: number }

type LoginRequest = {
  captcha?: boolean
  email: string
  password: string
  rememberMe?: boolean
}
