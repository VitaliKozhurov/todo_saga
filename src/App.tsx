import { useEffect } from 'react'

import { fetchTodosSagaAC, todoListsSelector, useAppDispatch, useAppSelector } from '@/features'
import { TodoList } from '@features/todolists/ui'

export const App = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(todoListsSelector)

  useEffect(() => {
    dispatch(fetchTodosSagaAC())
  }, [])

  return (
    <>
      {todos.map(todo => (
        <TodoList key={todo.id} title={todo.title} todolistId={todo.id} />
      ))}
    </>
  )
}
