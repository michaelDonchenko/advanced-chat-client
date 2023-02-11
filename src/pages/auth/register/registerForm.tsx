import Button from '@/components/buttons/button'
import TextInput from '@/components/inputs/textInput'
import useRegisterMutation from '@/hooks/mutations/useRegisterMutation'
import {AuthCredentials} from '@/interfaces'
import {Formik, Form} from 'formik'
import styled from 'styled-components'
import authValidationSchema from '../authValidationSchema'

const initialValues: AuthCredentials = {
  username: '',
  password: '',
}

const RegisterForm = () => {
  const {mutation, error} = useRegisterMutation()

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={authValidationSchema}
        onSubmit={(values) => mutation.mutateAsync(values)}
      >
        <Form>
          <TextInput name="username" type="text" label="Username" />
          <TextInput name="password" type="password" label="Password" />

          <Button>{mutation.isLoading ? 'Loading...' : 'Register'}</Button>
          <ErrorContainer>{mutation.isError ? error : null}</ErrorContainer>
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
