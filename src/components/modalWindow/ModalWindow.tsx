import { ReactNode } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

type Props = {
  buttonIcon?: ReactNode
  buttonText: string
  modalTitle: string
}

export const ModalWindow = ({ buttonIcon, buttonText, modalTitle }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>
        {buttonText}
        {buttonIcon}
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme={'blue'} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant={'ghost'}>Save changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
