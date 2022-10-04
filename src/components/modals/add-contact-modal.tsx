import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import Button from '../buttons/button'
import TextInput from '../inputs/text-input'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import errorHandler from '@/utils/error-handler'
import {createContact} from '@/api/user-api'
import {useAppDispatch} from '@/store/hooks'
import {addContact} from '@/store/reducers/contactsSlice'
import useModalContext from '@/context/modalContext'

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
  const {closeModal} = useModalContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()

  const onSubmit = useCallback(async (values: {username: string}) => {
    try {
      const {data} = await createContact(values.username)

      dispatch(addContact({contact: data.contact}))
      closeModal()
    } catch (error) {
      setError(errorHandler(error))
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <Container>
      <Title>Add new contact</Title>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ContactSchema}>
        <Form>
          <TextInput name='username' type='text' label='Username' />
          <Button>{loading ? 'Loading...' : 'Add'}</Button>
          <ErrorContainer>{error}</ErrorContainer>
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
