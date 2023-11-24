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
      <ActionTooltip align="center" label="Add a server" side="right">
        <button
          className="group flex items-center"
          type="button"
          onClick={handleModalOpen}
        >
          <div className="mx-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-3xl bg-background transition-all duration-300 group-hover:rounded-2xl group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus
              className="text-emerald-500 transition duration-300 group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
