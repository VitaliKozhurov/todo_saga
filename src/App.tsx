import { useEffect } from 'react'

import {
  createTodoSagaAC,
  fetchTodosSagaAC,
  todoListsSelector,
  useAppDispatch,
  useAppSelector,
} from '@/features'

export const App = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(todoListsSelector)

  useEffect(() => {
    const newTodo = createTodoSagaAC({ title: 'New todo' })

    dispatch(newTodo)
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
