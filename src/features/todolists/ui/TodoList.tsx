import { FilterValueType, TaskStatuses } from '@/common'
import { AddItem, ModalWindow } from '@/components'
import {
  Task,
  TodoListType,
  createTaskSagaAC,
  deleteTodoSagaAC,
  tasksSelectors,
  todoListActions,
  updateTodoSagaAC,
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
export const TodoList = ({ filter, id, title }: Props) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(tasksSelectors(id))

  const removeTodoList = () => {
    dispatch(deleteTodoSagaAC({ todolistId: id }))
  }
  const addTaskHandler = (title: string) => {
    dispatch(createTaskSagaAC({ title, todolistId: id }))
  }
  const changeTodoListFilterType = (filter: FilterValueType) => {
    dispatch(todoListActions.updateTodo({ todolistId: id, updateData: { filter } }))
  }
  const changeTodoTitle = (title: string) => {
    dispatch(updateTodoSagaAC({ todolistId: id, updateData: { title } }))
  }
  const getCurrentFilterType = (buttonName: FilterValueType) => {
    return filter === buttonName ? 'solid' : 'outline'
  }
  const filteredTask = () => {
    if (filter === FilterValueType.COMPLETED) {
      return tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    if (filter === FilterValueType.ACTIVE) {
      return tasks.filter(task => task.status === TaskStatuses.New)
    }

    return tasks
  }

  return (
    <Card border={'1px solid grey'} height={'fit-content'} width={'350px'}>
      <Stack divider={<StackDivider />} spacing={'2'}>
        <CardHeader alignItems={'center'} display={'flex'} justifyContent={'space-between'}>
          <Heading size={'lg'}>{title}</Heading>
          <div>
            <ModalWindow
              buttonText={'Edit'}
              callback={changeTodoTitle}
              modalTitle={'Edit todo title'}
              value={title}
            />
            <Button colorScheme={'red'} ml={2} onClick={removeTodoList} size={'lg'}>
              <DeleteIcon />
            </Button>
          </div>
        </CardHeader>

        <CardBody>
          <AddItem buttonTitle={'Add task'} callback={addTaskHandler} />

          {filteredTask().map(task => (
            <Task key={task.id} {...task} />
          ))}
        </CardBody>

        <CardFooter>
          <ButtonGroup display={'flex'} justifyContent={'space-around'} width={'100%'}>
            <Button
              colorScheme={'telegram'}
              flexBasis={'30%'}
              onClick={() => changeTodoListFilterType(FilterValueType.ALL)}
              size={'lg'}
              variant={getCurrentFilterType(FilterValueType.ALL)}
            >
              All
            </Button>
            <Button
              colorScheme={'telegram'}
              flexBasis={'30%'}
              onClick={() => changeTodoListFilterType(FilterValueType.ACTIVE)}
              size={'lg'}
              variant={getCurrentFilterType(FilterValueType.ACTIVE)}
            >
              Active
            </Button>
            <Button
              colorScheme={'telegram'}
              flexBasis={'30%'}
              onClick={() => changeTodoListFilterType(FilterValueType.COMPLETED)}
              size={'lg'}
              variant={getCurrentFilterType(FilterValueType.COMPLETED)}
            >
              Completed
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  )
}
