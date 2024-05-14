import { nanoid } from '@/lib/utils'
// import { Chat } from '@/components/chat'
import ChatAssistant from '@/components/chat-assistant'

export default function IndexAICodePage() {
  const id = nanoid()

  return <ChatAssistant id={id} />
}
