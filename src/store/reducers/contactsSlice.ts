import {Contact} from '@/interfaces/user-interfaces'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {getContacts} from '@/api/user-api'
import errorHandler from '@/utils/error-handler'

export interface ContactsSlice {
  contacts: Contact[]
  loading: boolean
  error: string
}

const initialState: ContactsSlice = {
  contacts: [],
  loading: false,
  error: '',
}

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => await getContacts())

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContact: (state, action: PayloadAction<{contact: Contact}>) => {
      state.contacts.unshift(action.payload.contact)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.contacts = action.payload.data.contacts
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false
        state.contacts = []
        state.error = errorHandler(action.payload)
      })
  },
})

export const {addContact} = contactsSlice.actions

export default contactsSlice.reducer
