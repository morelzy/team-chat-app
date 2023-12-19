import type { Channel, ChannelType, Server } from '@prisma/client'

import { create } from 'zustand'

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'serverSettings'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'deleteChannel'
  | 'editChannel'

interface ModalData {
  server?: Server
  channel?: Channel
  channelType?: ChannelType
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => {
    set({ isOpen: true, type, data })
  },
  onClose: () => {
    set({ isOpen: false, type: null })
  },
}))
