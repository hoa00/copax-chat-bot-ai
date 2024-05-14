'use client'
import { Button, Card, Table } from 'antd'
import { useEffect, useState } from 'react'

const columns = [
  {
    title: 'Points',
    dataIndex: 'value',
    key: 'value',
    render: (text: string, record: any) => {
      if (record.action === '-') {
        return <span className="text-red-500 text-right">-{text}</span>
      }

      return <span className="text-green-500 text-right">{text}</span>
    }
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt'
  }
]

export default function TableListPointTransaction() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [cursor, setCursor] = useState()
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    let url = '/api/point-transaction'
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

    const items = await data.json()
    setTransactions(prv => [...items, ...prv])
    if (items.length === 10) {
      setCursor(items[items.length - 1].createdAt)
    } else {
      setCursor(undefined)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card title="Point transaction">
      <Table
        dataSource={transactions}
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
