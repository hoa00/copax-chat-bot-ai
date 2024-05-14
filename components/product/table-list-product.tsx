'use client'
import { Button, Card, Table } from 'antd'
import { useRouter } from 'next/router'

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Earned Points',
    dataIndex: 'earnedPoints',
    key: 'earnedPoints'
  },
  {
    title: 'Buy',
    key: 'buy',
    dataIndex: 'tags',
    // @ts-ignore
    render: (_, item: any) => (
      <Button onClick={() => makeOrder(item)}>Buy</Button>
    )
  }
]

async function makeOrder(product: any) {
  /*
  readonly product: string;
  readonly quantity?: number;
  readonly price?: number;
  readonly totalPrice: number;
  */

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
  if (data.data.url) window.location.href = data.data.url
  // const url = data.url
}

export default function TableListProduct({ products }: { products: any[] }) {
  // const route = useRouter()

  return (
    <Card title="List product">
      <Table dataSource={products} rowKey="_id" columns={columns} />
    </Card>
  )
}
