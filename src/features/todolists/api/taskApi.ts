import { AppResponseType, axiosInstance } from '@/features'
import { AxiosResponse } from 'axios'

export class TaskApi {
  static createTask({ title, todolistId }: CreateTaskType) {
    return axiosInstance.post<
      AppResponseType<TaskApiType>,
      AxiosResponse<AppResponseType<TaskApiType>>,
      Omit<CreateTaskType, 'todolistId'>
    >(`todo-lists/${todolistId}/tasks`, { title })
  }
  static getTasks(todolistId: string) {
    return axiosInstance.get<TasksResponseType, AxiosResponse<TasksResponseType>, string>(
      `todo-lists/${todolistId}/tasks`
    )
  }
  static updateTask({ taskId: string, taskUpdate: TaskUpdateType, todolistId: string }) {
    return axiosInstance.put<
      AppResponseType<TaskApiType>,
      AxiosResponse<AppResponseType<TaskApiType>>
    >(`todo-lists/${todolistId}/tasks`, taskUpdate)
  }
}

type TasksResponseType = {
  error: null | string
  items: TaskApiType[]
  totalCount: number
}

type TaskApiType = {
  addedDate: Date
  completed: boolean
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

type TaskUpdateType = Pick<
  TaskApiType,
  'completed' | 'deadline' | 'description' | 'priority' | 'startDate' | 'status' | 'title'
>

type CreateTaskType = { title: string; todolistId: string }
