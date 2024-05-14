import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { clearChats } from '@/actions/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar'
import { SidebarList } from '@/components/sidebar-list'
import { IconSeparator } from '@/components/ui/icons'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ClearHistory } from '@/components/clear-history'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'

async function UserOrLogin() {
  const session = await auth()
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/" target="_blank" rel="nofollow">
          {/* <IconNextChat className="w-6 h-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden w-6 h-6 mr-2 dark:block" /> */}
          <Image
            className="w-6 h-6 mr-2 "
            src="https://img.icons8.com/?size=60&id=dmZwIe9ziSTf&format=png"
            alt="Logo"
            height={48}
            width={48}
          />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/sign-in?callbackUrl=/">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://google.com/"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <Image
            className="w-6 h-6 mr-2 "
            src="https://img.icons8.com/?size=30&id=r0JMFhtayoVB&format=png"
            alt="vali"
            height={25}
            width={25}
          />
          <span className="hidden ml-2 md:flex">Bot Travel</span>
        </a>
        <a
          href="https://google.com"
          target="_blank"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <Image
            className="w-6 h-6 mr-2 "
            src="https://img.icons8.com/?size=30&id=jsV5UnSehkRE&format=png"
            alt="vali"
            height={25}
            width={25}
          />
          <span className="hidden ml-2 md:flex">Bot Đồ ăn</span>
        </a>
      </div>
    </header>
  )
}
