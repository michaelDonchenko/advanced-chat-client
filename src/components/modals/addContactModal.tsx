import styled from 'styled-components'
import Button from '../buttons/button'
import TextInput from '../inputs/textInput'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import useAddContactMutation from '@/hooks/mutations/useAddContactMutation'

const initialValues = {
  username: '',
}

const ContactSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username is too short')
    .max(20, 'Username is too long')
    .required('This field is required'),
})

const AddContactModal: React.FC = () => {
  const {mutation, error} = useAddContactMutation()

  return (
    <Container>
      <Title>Add new contact</Title>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => mutation.mutateAsync(values.username)}
        validationSchema={ContactSchema}
      >
        <Form>
          <TextInput name='username' type='text' label='Username' />
          <Button>{mutation.isLoading ? 'Loading...' : 'Add'}</Button>
          <ErrorContainer>{error ?? null}</ErrorContainer>
        </Form>
      </Formik>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 16px;
`

const Title = styled.h2`
  margin-bottom: 20px;
`

const ErrorContainer = styled.div`
  color: ${({theme}) => theme.palette.error};
  margin: 10px 0;
`

export default AddContactModal
