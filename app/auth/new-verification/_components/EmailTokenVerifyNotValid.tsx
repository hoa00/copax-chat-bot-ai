'use client'
import { Result, Button } from 'antd'
import { useRouter } from 'next/navigation'

export default function EmailTokenVerifyNotValid() {
  const router = useRouter()

  return (
    <Result
      status="warning"
      title="Token verify email not valid!"
      extra={
        <Button type="primary" key="console" onClick={() => router.push('/')}>
          Go home
        </Button>
      }
    />
  )
}
