import { AppResponseType, axiosInstance } from '@/common'
import { AxiosResponse } from 'axios'

export class TaskApi {
  static createTask({ title, todolistId }: CreateTaskArgsType) {
    return axiosInstance.post<
      AppResponseType<TaskApiType>,
      AxiosResponse<AppResponseType<TaskApiType>>,
      { title: string }
    >(`todo-lists/${todolistId}/tasks`, { title })
  }
  static deleteTask({ taskId, todolistId }: DeleteTaskArgsType) {
    return axiosInstance.delete<AppResponseType, AxiosResponse<AppResponseType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    )
  }
  static getTasks(todolistId: string) {
    return axiosInstance.get<TasksResponseType, AxiosResponse<TasksResponseType>, string>(
      `todo-lists/${todolistId}/tasks`
    )
  }
  static updateTask({ taskId, taskUpdate, todolistId }: UpdateTaskArgsType) {
    return axiosInstance.put<
      AppResponseType<TaskApiType>,
      AxiosResponse<AppResponseType<TaskApiType>>,
      TaskUpdateType
    >(`todo-lists/${todolistId}/tasks/${taskId}`, taskUpdate)
  }
}

type TasksResponseType = {
  error: null | string
  items: TaskApiType[]
  totalCount: number
}

export type TaskApiType = {
  addedDate: Date
  deadline: Date
  description: string
  id: string
  order: number
  priority: number
  startDate: Date
  status: number
  title: string
  todoListId: string
}
type UpdateTaskArgsType = {
  taskId: string
  taskUpdate: TaskUpdateType
  todolistId: string
}

export type TaskUpdateType = Pick<
  TaskApiType,
  'deadline' | 'description' | 'priority' | 'startDate' | 'status' | 'title'
>

type CreateTaskArgsType = { title: string; todolistId: string }
type DeleteTaskArgsType = { taskId: string; todolistId: string }
