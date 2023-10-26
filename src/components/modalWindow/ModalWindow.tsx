import { ChangeEvent, ReactNode, useState } from 'react'

import {
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

type Props = {
  buttonIcon?: ReactNode
  buttonText: string
  callback: (value: string) => void
  modalTitle: string
  value: string
}

export const ModalWindow = ({ buttonIcon, buttonText, callback, modalTitle, value }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [title, setTitle] = useState(value)
  const [error, setError] = useState<null | string>(null)
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(null)
    setTitle(e.currentTarget.value)
  }
  const onSaveHandler = () => {
    if (title) {
      callback(title)
      onClose()
    } else {
      setError('Field can not be empty!')
    }
  }
  const onCloseHandler = () => {
    setTitle(value)
    setError(null)
    onClose()
  }

  return (
    <>
      <Button colorScheme={'teal'} onClick={onOpen} size={'lg'}>
        {buttonText}
        {buttonIcon}
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onCloseHandler}>
        <ModalOverlay />
        <ModalContent margin={'150px 0'} padding={'15px'}>
          <ModalHeader mb={10}>
            <Heading>{modalTitle}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input onChange={onChangeInputHandler} size={'lg'} value={title} />
            {error && <Text color={'red'}>{error}</Text>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={'blue'} mr={3} onClick={onCloseHandler} size={'lg'}>
              Close
            </Button>
            <Button onClick={onSaveHandler} size={'lg'} variant={'ghost'}>
              Save changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
