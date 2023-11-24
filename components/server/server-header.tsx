'use client'

import type { ServerWithMembersWithProfiles } from '@/types'

import { MemberRole } from '@prisma/client'
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useModalStore } from '@/hooks/use-modal-store'

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles
  role?: MemberRole
}

export function ServerHeader({ server, role }: ServerHeaderProps) {
  const { onOpen } = useModalStore()

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || MemberRole.MODERATOR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button
          className="text-md flex h-12 w-full items-center border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50"
          type="button"
        >
          {server.name}
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-0.5 text-xs font-medium text-black dark:text-neutral-400">
        {isModerator ? (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
            onClick={() => {
              onOpen('invite', { server })
            }}
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
        {isAdmin ? (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => {
              onOpen('serverSettings', { server })
            }}
          >
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
        {isModerator ? (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => {
              onOpen('members', { server })
            }}
          >
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
        {isModerator ? (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => {
              onOpen('createChannel')
            }}
          >
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
        {isModerator ? <DropdownMenuSeparator /> : null}
        {isAdmin ? (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Delete Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        ) : null}
        {!isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Leave Server
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
