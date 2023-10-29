import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import {
  LoginRequest,
  getLoggedInStatus,
  setAuthLoginStatusSagaAC,
  useAppDispatch,
  useAppSelector,
} from '@/features'
import { Button } from '@chakra-ui/react'

const formStyle: CSSProperties = {
  margin: '0 auto',
  width: '400px',
}
const inputStyle: CSSProperties = {
  border: '1px solid black',
  fontSize: '16px',
  padding: '5px',
  width: '100%',
}

export const Login = () => {
  const dispatch = useAppDispatch()

  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (data: LoginRequest) => {
    dispatch(setAuthLoginStatusSagaAC(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2 style={{ fontSize: '22px', marginBottom: '20px', textAlign: 'center' }}>Login</h2>
      <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>Email:</h3>
      <input
        style={inputStyle}
        type={'text'}
        {...register('email', { required: 'Field is required!' })}
      />
      <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>Password</h3>
      <input
        style={inputStyle}
        type={'password'}
        {...register('password', { required: 'Field is required!' })}
      />
      <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>Remember me</h3>
      <input type={'checkbox'} {...register('rememberMe')} />

      <Button
        colorScheme={'green'}
        display={'block'}
        margin={'50px auto'}
        type={'submit'}
        w={'full'}
      >
        Login
      </Button>
    </form>
  )
}
