'use client'

import { Alert } from 'antd'
import { useSearchParams } from 'next/navigation'

export default function PurchaseNotification() {
  const searchParams = useSearchParams()

  const checkoutStatus = searchParams.get('checkout')

  if (checkoutStatus === 'success') {
    return (
      <Alert
        message="Checkout success"
        description="You have successfully purchased the product. Thank you for your purchase!"
        type="success"
        showIcon
        // closable
      />
    )
  }
  if (checkoutStatus === 'canceled') {
    return (
      <Alert
        message="Checkout canceled"
        description="You have canceled the purchase. Please try again."
        type="error"
        showIcon
      />
    )
  }
  return <div>{}</div>
}
