import { Button } from '@chakra-ui/react'

type Props = {
  name?: string
}
export const Header = ({ name = 'User' }: Props) => {
  return (
    <div>
      <h2>{name}</h2>
      <Button>Logout</Button>
    </div>
  )
}
