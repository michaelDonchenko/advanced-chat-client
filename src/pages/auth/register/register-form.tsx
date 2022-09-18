import Button from '@/components/buttons/button'
import TextInput from '@/components/inputs/text-input'
import {Formik, Form, FormikHelpers} from 'formik'
import {useCallback} from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

interface FormValues {
  username: string
  email: string
  password: string
}

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

const initialValues: FormValues = {
  username: '',
  email: '',
  password: '',
}

const RegisterForm = () => {
  const handleSubmit = useCallback((values: FormValues, helpers: FormikHelpers<FormValues>) => {
    helpers.resetForm()
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
          <Button>Register</Button>
        </Form>
      </Formik>
    </Container>
  )
}

const Container = styled.div`
  margin: auto 0;
  padding: 16px;
`

export default RegisterForm
