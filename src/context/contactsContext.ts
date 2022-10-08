import {Contact} from '@/interfaces'
import create from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface ContactsContext {
  contacts: Contact[]
  setContacts: (contacts: Contact[]) => void
  clearContacts: () => void
  addContact: (contact: Contact) => void
  updateContactValues: (contact: Contact) => void
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
      updateContactValues: (updatedContact) => {
        set((state) => {
          const contactPosition = state.contacts.findIndex((contact) => contact.id === updatedContact.id)
          if (contactPosition === -1) {
            return
          }
          state.contacts[contactPosition] = updatedContact
        })
      },
    })),
    {name: 'contactsContext'}
  )
)

export default useContactsContext
