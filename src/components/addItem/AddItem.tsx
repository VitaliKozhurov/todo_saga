import { ChangeEvent, KeyboardEvent, useState } from 'react'

import { Button, FormErrorMessage, Input } from '@chakra-ui/react'
type Props = {
  buttonTitle: string
  callback: (title: string) => void
}
export const AddItem = ({ buttonTitle, callback }: Props) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<null | string>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(null)
    }
    setValue(e.currentTarget.value)
  }
  const addItemHandler = () => {
    callback(value)
    setValue('')
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && !!value.length) {
      addItemHandler()
    } else {
      setError('Field can not be empty!')
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        <Input onChange={onChange} onKeyDown={onKeyPressHandler} size={'lg'} value={value} />
        <Button colorScheme={'telegram'} onClick={addItemHandler} size={'lg'}>
          {buttonTitle}
        </Button>
      </div>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </>
  )
}
