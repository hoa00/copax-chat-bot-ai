'use client'

import { Message, experimental_useAssistant as useAssistant } from 'ai/react'
import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChatScrollAnchor } from './chat-scroll-anchor'

const roleToColorMap: Record<Message['role'], string> = {
  system: 'red',
  user: 'gray',
  function: 'blue',
  tool: 'purple',
  assistant: 'black',
  data: 'orange'
}

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export default function _ChatAssistant({
  id,
  initialMessages,
  className
}: ChatProps) {
  console.log(0)
  const router = useRouter()
  const path = usePathname()
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: '/api/assistant',
      body: {
        id,
        initialMessages
      }
    })
  console.log(1)

  // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    console.log('status', status)
    if (status === 'awaiting_message' && messages?.length > 0) {
      // kiểm tra xem nếu đang là view tạo mới thì chuyển sang view chi tiết
      if (!path.includes('chat')) {
        router.push(`/assistant/travel/chat/${id}`, {
          shallow: true,
          scroll: false
        })
        router.refresh()
      }
      // Focus the input
      inputRef.current?.focus()
    }
  }, [status, messages])

  console.log(2)

  if (error != null) {
    console.log('error', error)
  }

  // console.log('messages', messages)

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error != null && (
        <div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
        </div>
      )}

      {messages &&
        messages.length > 0 &&
        messages.map((m: Message) => (
          <div
            key={m.id}
            className="whitespace-pre-wrap"
            style={{ color: roleToColorMap[m.role] }}
          >
            <strong>{`${m.role}: `}</strong>
            {m.role !== 'data' && m.content}
            {m.role === 'data' && (
              <>
                {(m.data as any).description}
                <br />
                <pre className={'bg-gray-200'}>
                  {JSON.stringify(m.data, null, 2)}
                </pre>
              </>
            )}
            <br />
            <br />
          </div>
        ))}

      {initialMessages &&
        initialMessages.length > 0 &&
        initialMessages.map((m: Message) => (
          <div
            key={m.id}
            className="whitespace-pre-wrap"
            style={{ color: roleToColorMap[m.role] }}
          >
            <strong>{`${m.role}: `}</strong>
            {m.role !== 'data' && m.content}
            {m.role === 'data' && (
              <>
                {(m.data as any).description}
                <br />
                <pre className={'bg-gray-200'}>
                  {JSON.stringify(m.data, null, 2)}
                </pre>
              </>
            )}
            <br />
            <br />
          </div>
        ))}

      <ChatScrollAnchor trackVisibility={status === 'awaiting_message'} />

      {status === 'in_progress' && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}

      <form onSubmit={submitMessage}>
        <input
          ref={inputRef}
          disabled={status !== 'awaiting_message'}
          className="fixed inset-x-0 bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="What is the temperature in the living room?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
