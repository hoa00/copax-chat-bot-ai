'use client'
import { Button, Card, Table } from 'antd'
import { useEffect, useState } from 'react'

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id'
  },
  {
    title: 'Checkout',
    dataIndex: 'checkoutStatus',
    key: 'checkoutStatus'
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
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt'
  }
]

export default function TableListPurchase() {
  const [items, setItems] = useState<any[]>([])
  const [cursor, setCursor] = useState()
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    console.log('fetchData')
    setLoading(true)
    let url = '/api/purchase'
    if (cursor) {
      url += `?cursor=${cursor}`
    }
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    const resItems = await data.json()
    setItems(prv => [...resItems, ...prv])
    if (resItems.length === 10) {
      setCursor(resItems[resItems.length - 1].createdAt)
    } else {
      setCursor(undefined)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!items || items.length === 0) {
      fetchData()
    }
  }, [])

  return (
    <Card title="List purchase">
      <Table
        dataSource={items}
        rowKey="_id"
        columns={columns}
        size="small"
        loading={loading}
        virtual
      />
      <Button
        onClick={() => {
          fetchData()
        }}
        loading={loading}
        disabled={!cursor}
      >
        Load more
      </Button>
    </Card>
  )
}
