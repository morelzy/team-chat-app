'use client'

import { useEffect, useState } from 'react'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { SettingsServerModal } from '@/components/modals/server-settings-modal'
import { MembersModal } from '@/components/modals/members-modal'

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <SettingsServerModal />
      <MembersModal />
    </>
  )
}
