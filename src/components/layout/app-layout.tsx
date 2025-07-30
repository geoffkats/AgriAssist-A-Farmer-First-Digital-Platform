'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, LayoutDashboard, ShoppingBasket, TrendingUp, Users, Wheat } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/prices', label: 'Prices', icon: TrendingUp },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBasket },
  { href: '/agronomist', label: 'AI Agronomist', icon: Bot },
  { href: '/buyers', label: 'Buyers', icon: Users },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <Wheat className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold font-headline group-data-[collapsible=icon]:hidden">AgriAssist</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, side: 'right', align: 'center' }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8 !pt-0 min-h-screen">
          <header className="sticky top-0 z-10 flex items-center h-16 bg-background/80 backdrop-blur-sm md:hidden mb-4 -mx-4 px-4 border-b">
             <SidebarTrigger />
             <div className="flex items-center gap-2 mx-auto">
                <Wheat className="h-6 w-6 text-primary" />
                <h1 className="text-lg font-bold font-headline">AgriAssist</h1>
              </div>
          </header>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
