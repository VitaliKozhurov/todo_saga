import { CSSProperties } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  name?: string
}

const style: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  height: '80px',
  justifyContent: 'space-between',
  margin: '0 auto',
  maxWidth: '1200px',
}

export const Header = ({ name = 'User' }: Props) => {
  return (
    <div style={style}>
      <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{name}</h2>
      <Button colorScheme={'telegram'}>Logout</Button>
    </div>
  )
}
