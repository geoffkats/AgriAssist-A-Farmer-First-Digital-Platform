'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, Landmark, MessageSquare, BookOpen, ShoppingBasket, TrendingUp, Users, Wheat, Star } from 'lucide-react';
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
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useProStatus } from '@/context/pro-status-context';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/prices', label: 'Market Prices', icon: TrendingUp },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBasket },
  { href: '/agronomist', label: 'Ask Synth', icon: Bot },
  { href: '/guides', label: 'Knowledge Hub', icon: BookOpen },
  { href: '/community', label: 'Community', icon: MessageSquare },
  { href: '/finance', label: 'Finance', icon: Landmark },
  { href: '/buyers', label: 'Buyers', icon: Users },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isPro } = useProStatus();

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
        <SidebarFooter>
          {!isPro && (
            <Card className="m-2 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20 overflow-hidden group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none">
              <CardHeader className="p-3 group-data-[collapsible=icon]:p-0">
                 <CardTitle className="text-sm flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                    <Star className="text-primary"/>
                    Unlock Pro Features
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 group-data-[collapsible=icon]:p-0">
                  <div className="group-data-[collapsible=icon]:hidden">
                    <p className="text-xs text-primary-foreground/80 mb-3">Get AI price predictions, loan access, and more.</p>
                    <Button asChild size="sm" className="w-full">
                        <Link href="/pricing">Go Pro</Link>
                    </Button>
                  </div>
                   <div className="hidden group-data-[collapsible=icon]:block">
                     <Button asChild size="icon" className="h-8 w-8">
                        <Link href="/pricing">
                            <Star />
                        </Link>
                    </Button>
                   </div>
              </CardContent>
            </Card>
          )}
        </SidebarFooter>
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
