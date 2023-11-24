'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { ActionTooltip } from '@/components/action-tooltip'

interface NavigationItemProps {
  id: string
  imageUrl: string
  name: string
}

export function NavigationItem({ id, imageUrl, name }: NavigationItemProps) {
  const params = useParams()
  const router = useRouter()

  const onClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <ActionTooltip align="center" label={name} side="right">
      <button
        className="group relative flex items-center"
        type="button"
        onClick={onClick}
      >
        <div
          className={cn(
            'absolute left-0 w-1 rounded-r-full bg-primary transition-all',
            params?.serverId !== id && 'group-hover:h-[20px]',
            params?.serverId === id ? 'h-9' : 'h-2',
          )}
        />
        <div
          className={cn(
            'group relative mx-3 flex h-12 w-12 overflow-hidden rounded-3xl transition-all group-hover:rounded-2xl',
            params?.serverId === id && 'rounded-2xl bg-primary/10 text-primary',
          )}
        >
          <Image fill alt="Channel" src={imageUrl} />
        </div>
      </button>
    </ActionTooltip>
  )
}
