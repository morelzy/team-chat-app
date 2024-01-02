'use client'

import type { Member, Message, Profile } from '@prisma/client'

import { Fragment } from 'react'
import { Loader2, ServerCrash } from 'lucide-react'
import { format } from 'date-fns'

import { ChatWelcome } from '@/components/chat/chat-welcome'
import { ChatItem } from '@/components/chat/chat-item'
import { useChatQuery } from '@/hooks/use-chat-query'
import { useChatSocket } from '@/hooks/use-chat-socket'

const DATE_FORMAT = 'd MMM yyyy, HH:mm'

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}

interface ChatMessagesProps {
  name: string
  member: Member
  chatId: string
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, string>
  paramKey: 'channelId' | 'conversationId'
  paramValue: string
  type: 'channel' | 'conversation'
}

export function ChatMessages({
  apiUrl,
  chatId,
  member,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`
  const addKey = `chat:${chatId}:messages`
  const updateKey = `chat:${chatId}:messages:update`

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue })

  useChatSocket({ queryKey, addKey, updateKey })

  if (status === 'pending') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-2 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ServerCrash className="my-2 h-7 w-7 text-zinc-500" />
        <p className="text-xs text-rose-500 dark:text-rose-400/80">
          Something went wrong!
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto py-4">
      <div className="flex-1" />
      <ChatWelcome name={name} type={type} />
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                content={message.content}
                currentMember={member}
                deleted={message.deleted}
                fileUrl={message.fileUrl}
                id={message.id}
                isUpdate={message.updatedAt !== message.createdAt}
                member={message.member}
                socketQuery={socketQuery}
                socketUrl={socketUrl}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
