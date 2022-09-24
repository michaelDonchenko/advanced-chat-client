export interface Chat {
  id: number
  participants: number[]
  messages?: []
}

export interface Message {
  id: number
  from: number
  text: string
  createdAt: Date
  chatId: number
}
