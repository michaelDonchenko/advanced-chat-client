export interface User {
  id: number
  username: string
  photo: string
}

export interface Contact {
  id: number
  username: string
  photo: string
  conversationId: number
  userId: number
}

export interface GetContactsResponse {
  contacts: Contact[]
}

export interface CreateContactResponse {
  message?: string
  contact: Contact
}
