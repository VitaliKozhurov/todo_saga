import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})
export type AppResponseType<T = {}> = {
  data: T
  fieldsErrors: FieldErrorType[]
  messages: string[]
  resultCode: number
}

type FieldErrorType = { error: string; field: string }
