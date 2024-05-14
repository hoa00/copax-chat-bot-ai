'use client'
import { Button, Form, Input, Select, Space, InputNumber, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { Toaster, toast } from 'sonner'
import toast from 'react-hot-toast'

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

interface Props {
  // submitProductHandle: (values: any) => void
}

async function submitProductHandle(values: any) {
  return fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
    cache: 'no-store'
  })
}

const FormCreateProduct: React.FC<Props> = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = (values: any) => {
    submitProductHandle(values).then(() => {
      setIsModalOpen(false)
      toast('Tạo thành công')
      router.refresh()
    })
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' })
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add new
      </Button>
      <Modal
        title="Create product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (USD)"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="earnedPoints"
            label="Ngọc ánh sao (Points) nhận được"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FormCreateProduct
