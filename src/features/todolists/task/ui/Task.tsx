import { ChangeEvent } from 'react'

import { TaskStatuses } from '@/common'
import { ModalWindow } from '@/components'
import { TaskApiType, deleteTaskSagaAC, updateTaskSagaAC, useAppDispatch } from '@/features'
import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, Checkbox, Text } from '@chakra-ui/react'

type Props = TaskApiType

export const Task = (task: Props) => {
  const { id, status, title, todoListId } = task
  const dispatch = useAppDispatch()
  const removeTaskHandler = () => {
    dispatch(deleteTaskSagaAC({ taskId: id, todolistId: todoListId }))
  }
  const updateTaskTitle = (title: string) => {
    dispatch(
      updateTaskSagaAC({
        task,
        taskUpdate: { title },
      })
    )
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked
    const newStatus = isChecked ? TaskStatuses.Completed : TaskStatuses.New

    dispatch(
      updateTaskSagaAC({
        task,
        taskUpdate: { status: newStatus },
      })
    )
  }

  const isChecked = status === TaskStatuses.Completed

  return (
    <Card mb={5}>
      <CardBody
        alignItems={'center'}
        display={'flex'}
        justifyContent={'space-between'}
        padding={'5px'}
      >
        <Text fontSize={'large'} pt={'2'}>
          {title}
        </Text>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Checkbox isChecked={isChecked} onChange={changeTaskStatusHandler} size={'lg'} />
          <ModalWindow
            buttonText={'Edit'}
            callback={updateTaskTitle}
            modalTitle={'Edit title'}
            value={title}
          />
          <Button colorScheme={'red'} onClick={removeTaskHandler} size={'lg'}>
            <DeleteIcon />
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
