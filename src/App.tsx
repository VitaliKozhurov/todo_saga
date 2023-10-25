import { useEffect } from 'react'

import { fetchTodosSagaAC, todoListsSelector, useAppDispatch, useAppSelector } from '@/features'

export const App = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(todoListsSelector)

  useEffect(() => {
    dispatch(fetchTodosSagaAC())
  }, [])

  return (
    <>
      {todos.map(todo => (
        <h2 key={todo.id}>{todo.title}</h2>
      ))}
    </>
  )
}
