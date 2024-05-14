'use client'

import { Message, experimental_useAssistant as useAssistant } from 'ai/react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChatScrollAnchor } from './chat-scroll-anchor'
import toast from 'react-hot-toast'
import { Alert, Button } from 'antd'

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
  threadId?: string
}

export default function ChatAssistant({
  id,
  initialMessages,
  threadId
}: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: '/api/test',
      body: {
        id,
        threadId: threadId
      }
    })

  const [lowPoint, setLowPoint] = useState(false)

  function navigateToProduct() {
    window.location.href = '/products'
  }

  // gọi API để lấy current point
  async function getCurrentPoint() {
    const data = await fetch('/api/current-point', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    const { currentPoint } = await data.json()

    return currentPoint ?? 0
  }

  //thông báo hết điểm khi mới vào luôn
  useEffect(() => {
    getCurrentPoint().then(currentPoint => {
      if (currentPoint < 10) {
        setLowPoint(true)
      }
    })
  }, [])

  async function handleSubmitChat(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    const currentPoint = await getCurrentPoint()
    if (currentPoint < 10) {
      toast.error('Bạn đã hết điểm, vui lòng nạp thêm để sử dụng')
      setLowPoint(true)
      return
    }

    submitMessage(event)
  }

  // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (status === 'awaiting_message' && messages?.length > 1) {
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

  // useEffect(() => {
  //   console.log('>>>> messages', messages)
  // }, [messages])

  function extractContent(content: any) {
    if (typeof content === 'string') {
      return content
    } else if (Array.isArray(content)) {
      return content[0]['text']['value'] ?? ''
    } else {
      return ''
    }
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {lowPoint && (
        <Alert
          message="Your remaining points are too low"
          showIcon
          description="Please purchase additional points to continue using the service!"
          type="error"
          action={
            <Button size="small" danger onClick={navigateToProduct}>
              Go to Shop
            </Button>
          }
        />
      )}
      {error != null && (
        <div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
        </div>
      )}
      {initialMessages &&
        initialMessages.length > 0 &&
        initialMessages.map((m: Message) => (
          <div
            key={m.id}
            className="whitespace-pre-wrap"
            // style={{ color: roleToColorMap[m.role] }}
          >
            <strong>{`${m.role}: `}</strong>
            {/* {m.role !== 'data' && m.content} */}
            {extractContent(m.content)}

            <br />
          </div>
        ))}

      {messages.map((m: Message) => (
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

      {status === 'in_progress' && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}

      <form onSubmit={handleSubmitChat}>
        <input
          ref={inputRef}
          disabled={status !== 'awaiting_message'}
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Text AI assistant for help."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
