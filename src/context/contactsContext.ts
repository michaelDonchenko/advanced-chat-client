import {Contact} from '@/interfaces/user-interfaces'
import create from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface ContactsContext {
  contacts: Contact[]
  setContacts: (contacts: Contact[]) => void
  clearContacts: () => void
  addContact: (contact: Contact) => void
}

const useContactsContext = create<ContactsContext>()(
  devtools(
    immer((set) => ({
      contacts: [],
      setContacts: (contacts) => {
        set((state) => {
          state.contacts = contacts
        })
      },
      clearContacts: () => {
        set((state) => {
          state.contacts = []
        })
      },
      addContact: (contact) => {
        set((state) => {
          state.contacts.unshift(contact)
        })
      },
    })),
    {name: 'contactsContext'}
  )
)

export default useContactsContext
