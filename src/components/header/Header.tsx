import { CSSProperties } from 'react'

import {
  getLoggedInStatus,
  setAuthLogoutStatusSagaAC,
  useAppDispatch,
  useAppSelector,
} from '@/features'
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
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(getLoggedInStatus)
  const logOutHandler = () => {
    dispatch(setAuthLogoutStatusSagaAC())
  }

  return (
    <div style={style}>
      <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{name}</h2>
      {isLoggedIn && (
        <Button colorScheme={'telegram'} onClick={logOutHandler}>
          Logout
        </Button>
      )}
    </div>
  )
}
