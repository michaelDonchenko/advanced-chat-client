import {register} from '@/api/auth-api'
import Button from '@/components/buttons/button'
import TextInput from '@/components/inputs/text-input'
import {RegisterCredentials} from '@/interfaces/auth-interfaces'
import {Formik, Form, FormikHelpers} from 'formik'
import {useCallback, useState} from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import {useAppDispatch} from '@/store/hooks'
import {register as registerDispatch} from '@/store/reducers/authSlice'
import {setLocalStorage} from '@/utils/localStorage'
import errorHandler from '@/utils/error-handler'

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username is too short')
    .max(20, 'Username is too long')
    .required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .max(20, 'Password is too long')
    .required('This field is required'),
})

const initialValues: RegisterCredentials = {
  username: '',
  email: '',
  password: '',
}

const RegisterForm = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = useCallback(async (values: RegisterCredentials, helpers: FormikHelpers<RegisterCredentials>) => {
    try {
      setLoading(true)
      const {data} = await register(values)

      if (data) {
        dispatch(registerDispatch(data))
        setLocalStorage('user', data.user)
        setLocalStorage('jwt', data.jwt)
        setLocalStorage('isAuthenticated', true)
      }
    } catch (error) {
      setError(errorHandler(error))
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, helpers) => handleSubmit(values, helpers)}
      >
        <Form>
          <TextInput name='username' type='text' label='Username' />
          <TextInput name='email' type='email' label='Email' />
          <TextInput name='password' type='password' label='Password' />

          <Button>{loading ? 'Loading...' : 'Register'}</Button>
          <ErrorContainer>{error}</ErrorContainer>
        </Form>
      </Formik>
    </Container>
  )
}

const Container = styled.div`
  margin: auto 0;
  padding: 16px;
`

const ErrorContainer = styled.div`
  color: ${({theme}) => theme.palette.error};
  margin: 10px 0;
`

export default RegisterForm
