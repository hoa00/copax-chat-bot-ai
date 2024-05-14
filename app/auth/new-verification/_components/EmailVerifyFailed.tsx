'use client'
import { Result, Button } from 'antd'
import { useRouter } from 'next/navigation'

export default function EmailVerifyFailed() {
  const router = useRouter()
  return (
    <Result
      status="error"
      title="Verify email Failed"
      subTitle="Please check your email again."
      extra={[
        <Button type="primary" key="console" onClick={() => router.push('/')}>
          Go home
        </Button>
        // <Button key="buy">Buy Again</Button>
      ]}
    />
  )
}
