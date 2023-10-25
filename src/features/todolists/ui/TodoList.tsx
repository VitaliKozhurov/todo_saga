import { deleteTodoSagaAC, tasksSelectors, useAppDispatch, useAppSelector } from '@/features'
import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from '@chakra-ui/react'

type Props = {
  title: string
  todolistId: string
}
export const TodoList = ({ title, todolistId }: Props) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(tasksSelectors(todolistId))
  const removeTodoList = () => {
    dispatch(deleteTodoSagaAC({ todolistId }))
  }

  return (
    <Card width={'350px'}>
      <Stack divider={<StackDivider height={'1px'} />} spacing={'4'}>
        <CardHeader display={'flex'} justifyContent={'space-between'}>
          <Heading mb={10} mt={10} size={'sm'}>
            {title}
          </Heading>
          <Button onClick={removeTodoList}>
            <DeleteIcon />
          </Button>
        </CardHeader>
        <CardBody>
          {tasks.map(task => (
            <h2 key={task.id}>{task.title}</h2>
          ))}
        </CardBody>
      </Stack>
    </Card>
  )
}
