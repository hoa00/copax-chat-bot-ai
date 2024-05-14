'use client'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { ConfigProvider, theme, Button, Layout, Menu, App } from 'antd'
import { useEffect, useState } from 'react'
import {
  FaComments,
  FaUser,
  FaCartShopping,
  FaGear,
  FaOutdent,
  FaIndent,
  FaMoneyBillTransfer
} from 'react-icons/fa6'

const {
  defaultAlgorithm,
  compactAlgorithm,
  darkAlgorithm,
  useToken,
  getDesignToken
} = theme
const { Header, Sider, Content } = Layout

export default function SystemConfigLayout({
  children
}: React.PropsWithChildren) {
  const router = useRouter()
  const { theme: currentTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { borderRadiusLG }
  } = useToken()

  let { colorBgContainer } = getDesignToken()

  function goto(path: string) {
    router.push(path)
  }

  return (
    <ConfigProvider
      theme={{
        // algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm
        algorithm:
          currentTheme === 'dark' ? [darkAlgorithm] : [defaultAlgorithm]
      }}
    >
      <App>
        <Layout hasSider>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
              // theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1.1',
                  icon: <FaComments />,
                  label: 'Chat assistant',
                  onClick: () => goto('/')
                },
                {
                  key: '1',
                  icon: <FaUser />,
                  label: 'Settings',
                  onClick: () => goto('/settings')
                },
                {
                  key: '2',
                  icon: <FaCartShopping />,
                  label: 'Point shop',
                  onClick: () => goto('/products')
                },

                {
                  key: '4',
                  icon: <FaMoneyBillTransfer />,
                  label: 'Checkout',
                  onClick: () => goto('/purchase')
                },
                {
                  key: '3',
                  icon: <FaGear />,
                  label: 'Admin',
                  onClick: () => goto('/system-config')
                }
              ]}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <FaIndent /> : <FaOutdent />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64
                }}
              />
            </Header>
            <Content
              style={{
                margin: '12px 8px',
                padding: 12,
                minHeight: 280,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  )
}
