'use client'

import type { ChannelType } from '@prisma/client'
import type { ServerWithMembersWithProfiles } from '@/types'

import { MemberRole } from '@prisma/client'
import { Plus, Settings } from 'lucide-react'

import { ActionTooltip } from '@/components/action-tooltip'
import { useModalStore } from '@/hooks/use-modal-store'

interface ServerSectionProps {
  label: string
  role?: MemberRole
  sectionType: 'channels' | 'members'
  channelType?: ChannelType
  server?: ServerWithMembersWithProfiles
}

export function ServerSection({
  label,
  sectionType,
  channelType,
  role,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModalStore()

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            type="button"
            onClick={() => {
              onOpen('createChannel', { channelType })
            }}
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            type="button"
            onClick={() => {
              onOpen('members')
            }}
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}
