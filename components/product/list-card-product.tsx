'use client'

import { Button, Card, Col, Flex, Row } from 'antd'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function ListCardProduct({ products }: { products: any[] }) {
  const [loading, setLoading] = useState(false)

  async function makeOrder(product: any) {
    setLoading(true)
    const input = {
      product: product._id,
      quantity: 1,
      price: product.price,
      totalPrice: product.price
    }

    // products
    const result = await fetch('/api/products/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input),
      cache: 'no-store'
    })

    const data = await result.json()
    console.log('data.url: > ', data.url)

    // redirect(data.url)

    // window?.location.href(data.url)
    if (data.data.url) {
      window.location.href = data.data.url
    } else {
      toast.error('Could not redirect to checkout page')
    }
    // const url = data.url
    setLoading(false)
  }

  return (
    <div className="p-4">
      <Flex wrap="wrap" gap="small">
        {products?.map(product => (
          <Card
            title={product.name}
            bordered={false}
            style={{ width: 300 }}
            key={product._id}
            actions={[
              <Button
                type="primary"
                key="buy"
                onClick={() => makeOrder(product)}
                loading={loading}
              >
                Buy now
              </Button>
            ]}
          >
            <p>{product.description}</p>
            <p>Giá: {product.price}</p>
            <p>Nguyên thạch: {product.earnedPoints}</p>
          </Card>
        ))}
      </Flex>
    </div>
  )
}
