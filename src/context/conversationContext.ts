import {Conversation} from '@/interfaces/user-interfaces'
import create from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface ConversationContext {
  activeConversationId: number | null
  conversation: Conversation | null
  setActiveConversationId: (id: number) => void
  setConversation: (conversation: Conversation) => void
}

const useConversationContext = create<ConversationContext>()(
  devtools(
    immer((set) => ({
      activeConversationId: null,
      conversation: null,
      setActiveConversationId: (id: number) => {
        set(
          (state) => {
            state.activeConversationId = id
          },
          false,
          {type: 'conversation/setActive'}
        )
      },
      setConversation: (conversation: Conversation) => {
        set(
          (state) => {
            state.conversation = conversation
          },
          false,
          {type: 'conversation/setConversation'}
        )
      },
    })),
    {name: 'conversationContext'}
  )
)

export default useConversationContext
