import { AppResponseType, axiosInstance } from '@/common'
import { AxiosResponse } from 'axios'

export class TodoListApi {
  static createTodoList(body: CreateTodoListRequestType) {
    return axiosInstance.post<
      AppResponseType<TodoListServerType>,
      AxiosResponse<AppResponseType<TodoListServerType>>,
      CreateTodoListRequestType
    >('todo-lists', body)
  }
  static deleteTodoList(todolistId: string) {
    return axiosInstance.delete<AppResponseType, AxiosResponse<AppResponseType>, string>(
      `todo-lists/${todolistId}`
    )
  }
  static getTodoLists() {
    return axiosInstance.get<TodoListServerType[], AxiosResponse<TodoListServerType[]>>(
      'todo-lists'
    )
  }
  static updateTodoListTitle({ title, todolistId }: UpdateTodoListTitleRequestType) {
    return axiosInstance.put<AppResponseType, AxiosResponse<AppResponseType>, { title: string }>(
      `todo-lists/${todolistId}`,
      { title }
    )
  }
}

export type TodoListServerType = {
  addedDate: Date
  id: string
  order: number
  title: string
}

type CreateTodoListRequestType = { title: string }

type UpdateTodoListTitleRequestType = { title: string; todolistId: string }
