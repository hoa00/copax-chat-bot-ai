import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export default function IndexAICodePage() {
  const id = nanoid()

  return <Chat id={id} />
}
