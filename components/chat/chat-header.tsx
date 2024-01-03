import { Hash } from 'lucide-react'

import { MobileToggle } from '@/components/mobile-toggle'
import { UserAvatar } from '@/components/user-avatar'

interface ChatHeaderProps {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}

export function ChatHeader({
  name,
  serverId,
  type,
  imageUrl,
}: ChatHeaderProps) {
  return (
    <div className="flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === 'conversation' && (
        <UserAvatar className="mr-2 h-8 w-8 md:h-8 md:w-8" src={imageUrl} />
      )}
      <p>{name}</p>
    </div>
  )
}
