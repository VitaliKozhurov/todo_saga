import { useEffect } from 'react'

import { fetchTodosSagaAC, todoListsSelector, useAppDispatch, useAppSelector } from '@/features'
import { Heading } from '@chakra-ui/react'
import { TodoList } from '@features/todolists/ui'

export const App = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(todoListsSelector)

  useEffect(() => {
    dispatch(fetchTodosSagaAC())
  }, [])

  return (
    <>
      <Heading mb={20} mt={5} textAlign={'center'}>
        Task Manager
      </Heading>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {todos.map(todo => (
          <TodoList key={todo.id} {...todo} />
        ))}
      </div>
    </>
  )
}
