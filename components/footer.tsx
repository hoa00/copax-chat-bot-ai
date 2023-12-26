import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Chat BOT có thể phản hồi không đúng, kiểm tra lại thông tin quan trọng.
      Development by{' '}
      <ExternalLink href="http://hoadev.com">HoaDev</ExternalLink>.
    </p>
  )
}
