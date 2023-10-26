import { useEffect } from 'react'

import { AddItem } from '@/components'
import {
  createTodoSagaAC,
  fetchTodosSagaAC,
  todoListsSelector,
  useAppDispatch,
  useAppSelector,
} from '@/features'
import { Heading } from '@chakra-ui/react'
import { TodoList } from '@features/todolists/ui'

export const App = () => {
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
