import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

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
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  const onSubmit = data => {}

  return (
    <form style={formStyle}>
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
    </form>
  )
}
