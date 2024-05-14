import { getChat } from '@/actions/actions'
import { getChatsFromOpenAIAssistant } from '@/actions/openai-assitant.actions'
import { auth } from '@/auth'
import ChatAssistant from '@/components/chat-assistant'
import { notFound, redirect } from 'next/navigation'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatAssistantPage({ params }: ChatPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const chat = await getChatsFromOpenAIAssistant(params.id, session.user.id)

  if (!chat) {
    notFound()
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  return (
    <ChatAssistant
      id={params.id}
      initialMessages={chat.messages}
      threadId={chat.threadId}
    />
  )
}
