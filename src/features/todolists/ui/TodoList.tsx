import { ModalWindow } from '@/components'
import {
  TodoListType,
  deleteTodoSagaAC,
  tasksSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/features'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
} from '@chakra-ui/react'

type Props = TodoListType
export const TodoList = ({ id, title }: Props) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(tasksSelectors(id))
  const removeTodoList = () => {
    dispatch(deleteTodoSagaAC({ todolistId: id }))
  }

  return (
    <Card border={'1px solid grey'} width={'350px'}>
      <Stack divider={<StackDivider />} spacing={'2'}>
        <CardHeader alignItems={'center'} display={'flex'} justifyContent={'space-between'}>
          <Heading size={'md'}>{title}</Heading>
          <div>
            <ModalWindow buttonText={'Edit'} modalTitle={'Edit todo title'} />
            <Button ml={2} onClick={removeTodoList}>
              <DeleteIcon />
            </Button>
          </div>
        </CardHeader>

        <CardBody>
          {tasks.map(task => (
            <h2 key={task.id}>{task.title}</h2>
          ))}
        </CardBody>
        <CardFooter>
          <ButtonGroup display={'flex'} justifyContent={'space-around'} width={'100%'}>
            <Button colorScheme={'teal'} flexBasis={'30%'} size={'lg'}>
              All
            </Button>
            <Button colorScheme={'teal'} flexBasis={'30%'} size={'lg'}>
              Active
            </Button>
            <Button colorScheme={'teal'} flexBasis={'30%'} size={'lg'}>
              Completed
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  )
}
