'use client'

import { Plus } from 'lucide-react'

import { useModalStore } from '@/hooks/use-modal-store'
import { ActionTooltip } from '@/components/action-tooltip'

export function NavigationAction() {
  const { onOpen } = useModalStore()

  const handleModalOpen = () => {
    onOpen('createServer')
  }

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button className="group flex items-center" onClick={handleModalOpen}>
          <div className="flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 duration-300">
            <Plus
              className="group-hover:text-white transition text-emerald-500 duration-300"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
