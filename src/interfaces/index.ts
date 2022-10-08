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
  unreadMessages: number
  lastMessage: {
    text: string
    updatedAt: string
  }
  status: 'online' | 'offline'
}

export interface Conversation {
  id: number
  participants: number[]
  messages: Message[]
}

export interface Message {
  id: number
  from: number
  text: string
  createdAt: Date
  conversationId: number
}

export interface GetContactsResponse {
  contacts: Contact[]
}

export interface CreateContactResponse {
  message?: string
  contact: Contact
}

export interface ConversationResponse {
  conversation: Conversation
}

export interface AuthCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  user: User
  jwt: string
}

export interface logoutResponse {
  message: string
}
