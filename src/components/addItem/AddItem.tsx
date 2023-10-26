import { ChangeEvent, KeyboardEvent, useState } from 'react'

import { Button, Input, Text } from '@chakra-ui/react'

type Props = {
  buttonTitle: string
  callback: (title: string) => void
}
export const AddItem = ({ buttonTitle, callback }: Props) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<null | string>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(null)
    setValue(e.currentTarget.value)
  }
  const addItemHandler = () => {
    if (value.length) {
      callback(value)
      setValue('')
    } else {
      setError('Field can not be empty!')
    }
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      addItemHandler()
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', position: 'relative' }}>
        <Input onChange={onChange} onKeyDown={onKeyPressHandler} size={'lg'} value={value} />
        <Button colorScheme={'telegram'} onClick={addItemHandler} size={'lg'}>
          {buttonTitle}
        </Button>
        {error && (
          <Text
            color={'red'}
            fontSize={'lg'}
            style={{ bottom: '-15px', left: '2px', position: 'absolute' }}
          >
            {error}
          </Text>
        )}
      </div>
    </>
  )
}
