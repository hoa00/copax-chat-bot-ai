'use client'

import { Button, Card, Statistic } from 'antd'
import { useRouter } from 'next/navigation'

export default function CurrentPointStatic({
  currentPoint
}: {
  currentPoint: number
}) {
  const router = useRouter()

  function gotoProducts() {
    router.push('/products')
  }
  return (
    <Card bordered={false}>
      <Statistic
        title="Account Balance (Point)"
        value={currentPoint}
        // precision={2}
      />
      <Button
        style={{ marginTop: 16 }}
        type="primary"
        size="small"
        onClick={gotoProducts}
      >
        Buy
      </Button>
    </Card>
  )
}
