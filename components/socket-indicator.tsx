'use client'

import { useSocket } from '@/components/providers/socket-provider'
import { Badge } from '@/components/ui/badge'

export function SocketIndicator() {
  const { isConnected } = useSocket()

  return isConnected ? (
    <Badge className="border-none bg-emerald-600 text-white" variant="outline">
      Live: Real-time updates
    </Badge>
  ) : (
    <Badge className="border-none bg-yellow-600 text-white" variant="outline">
      Fallback: Polling every 1s
    </Badge>
  )
}
