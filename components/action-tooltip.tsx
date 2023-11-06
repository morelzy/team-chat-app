'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
  children: React.ReactNode
  label: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function ActionTooltip({
  children,
  label,
  align,
  side
}: ActionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align={align} side={side}>
          <p className="font-semibold text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
