import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { NavigationSidebar } from '@/components/navigation/navigation-sidebar'
import { ServerSidebar } from '@/components/server/server-sidebar'

export function MobileToggle({ serverId }: { serverId: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" size="icon" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex gap-0 p-0" side="left">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}
