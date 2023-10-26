import { useEffect } from 'react'

import { AddItem } from '@/components'
import {
  appErrorSelector,
  createTodoSagaAC,
  fetchTodosSagaAC,
  todoListsSelector,
  useAppDispatch,
  useAppSelector,
} from '@/features'
import { Heading, useToast } from '@chakra-ui/react'
import { TodoList } from '@features/todolists/ui'

export const App = () => {
  const toast = useToast()
  const appError = useAppSelector(appErrorSelector)
  const dispatch = useAppDispatch()
  const todos = useAppSelector(todoListsSelector)

  useEffect(() => {
    dispatch(fetchTodosSagaAC())
  }, [])
  const addNewTodoHandler = (title: string) => {
    dispatch(createTodoSagaAC({ title }))
  }

  return (
    <>
      {appError &&
        toast({
          description: appError,
          duration: 5000,
          isClosable: true,
          status: 'error',
          title: 'Application Error',
        })}
      <Heading mb={20} mt={5} textAlign={'center'}>
        Task Manager
      </Heading>
      <div style={{ margin: '0 auto 30px', width: '400px' }}>
        <AddItem buttonTitle={'Add new todo'} callback={addNewTodoHandler} />
      </div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {todos.map(todo => (
          <TodoList key={todo.id} {...todo} />
        ))}
      </div>
    </>
  )
}
