import { UseChatHelpers } from 'ai/react'
import { ExternalLink } from './external-link'
import { Button } from './ui/button'
import { IconArrowRight } from './ui/icons'

// import { Button } from '@/components/ui/button'
// import { ExternalLink } from '@/components/external-link'
// import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Hỏi về món ăn ngon nhất',
    message: `Món ăn ngon nhất ở VN?`
  },
  {
    heading: 'Lên danh sách địa điểm phải ghé ở Đà Lạt',
    message:
      'Danh sách các điểm du lịch phải đến ở Đà Lạt với các tiêu chí sau: \n'
  },
  {
    heading: 'Thủ tục check-in ở sân bay Singapore',
    message: `Cần lưu ý ì về giấy tờ check-in ở sân bay Singapore?: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">Welcome to AI assistant!</h1>
        <p className="mb-2 leading-normal text-muted-foreground  ">
          AI assistant helps you plan your trip.
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
