import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'p-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      <ExternalLink href="http://sydigi.com">Sydigi AI assistant</ExternalLink>
      can make mistakes. Consider checking important information.
      {/* <br /> Development by{' '}
      <ExternalLink href="http://hoadev.com">HoaDev</ExternalLink>. */}
    </p>
  )
}
