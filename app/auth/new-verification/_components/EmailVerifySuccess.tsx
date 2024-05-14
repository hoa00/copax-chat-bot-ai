'use client'

import { Result, Button } from 'antd'
import { useRouter } from 'next/navigation'

export default function EmailVerifySuccess() {
  const router = useRouter()
  return (
    <Result
      status="success"
      title="Successfully verify your email!"
      // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button
          type="primary"
          key="go-login"
          onClick={() => router.push('/auth/login')}
        >
          Go to login
        </Button>
        // <Button key="buy">Buy Again</Button>
      ]}
    />
  )
}
