
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bot, Home, Landmark, MessageSquare, BookOpen, ShoppingBasket, TrendingUp, Users, Wheat, Star, AreaChart, LogOut, User, Shield, Briefcase, Settings, Package, Banknote, MessageCircle, FileText, UserCog, Library, Truck, Group } from 'lucide-react';
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
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useProStatus } from '@/context/pro-status-context';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback } from '../ui/avatar';


const navItems = [
  { href: '/', label: 'Home', icon: Home, group: 'App' },
  { href: '/prices', label: 'Market Prices', icon: TrendingUp, group: 'App' },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBasket, group: 'App' },
  { href: '/agronomist', label: 'Ask Synth', icon: Bot, group: 'App' },
  { href: '/guides', label: 'Knowledge Hub', icon: BookOpen, group: 'App' },
  { href: '/community', label: 'Community', icon: MessageSquare, group: 'App' },
  { href: '/finance', label: 'Finance', icon: Landmark, group: 'App' },
  { href: '/buyers', label: 'Buyers', icon: Users, group: 'App' },
  { href: '/analytics', label: 'Analytics', icon: AreaChart, group: 'App', pro: true },
];

const adminNavItems = [
    { href: '/admin/dashboard', label: 'Overview', icon: Shield, group: 'Admin' },
    { href: '/admin/farmers', label: 'Farmer Management', icon: UserCog, group: 'Admin' },
    { href: '/admin/suppliers', label: 'Suppliers & Products', icon: Package, group: 'Admin' },
    { href: '/admin/loans', label: 'Loan & Credit', icon: Banknote, group: 'Admin' },
    { href: '/admin/orders', label: 'Marketplace Orders', icon: Truck, group: 'Admin' },
    { href: '/admin/buyers', label: 'Buyer & Co-op Network', icon: Group, group: 'Admin' },
    { href: '/admin/content', label: 'Content Hub', icon: Library, group: 'Admin' },
    { href: '/admin/messaging', label: 'Messaging', icon: MessageCircle, group: 'Admin' },
    { href: '/admin/financials', label: 'Financial Control', icon: FileText, group: 'Admin' },
    { href: '/admin/settings', label: 'Settings', icon: Settings, group: 'Admin' },
];


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isPro } = useProStatus();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  const combinedNavItems = user?.role === 'admin' ? [...navItems, ...adminNavItems] : navItems;
  const navGroups = [...new Set(combinedNavItems.map(item => item.group))];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <Wheat className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold font-headline group-data-[collapsible=icon]:hidden text-sidebar-primary">AgriAssist</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
           <SidebarGroup>
              {user && (
                <div className="flex items-center gap-3 p-2">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                  </div>
                </div>
              )}
            </SidebarGroup>

          <SidebarMenu>
            {navGroups.map(group => (
              <SidebarGroup key={group}>
                <SidebarGroupLabel>{group}</SidebarGroupLabel>
                {combinedNavItems.filter(item => item.group === group).map((item) => {
                  if (item.pro && !isPro) return null;
                  return (
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
                  )
                })}
              </SidebarGroup>
            ))}

            <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  tooltip={{ children: "Logout", side: 'right', align: 'center' }}
                >
                  <LogOut />
                  <span className="truncate">Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {!isPro && user?.role !== 'admin' && (
            <Card className="m-2 bg-gradient-to-br from-primary to-accent border-none overflow-hidden group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none text-white">
              <CardHeader className="p-3 group-data-[collapsible=icon]:p-0">
                 <CardTitle className="text-sm flex items-center gap-2 group-data-[collapsible=icon]:hidden text-primary-foreground">
                    <Star/>
                    Unlock Pro Features
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 group-data-[collapsible=icon]:p-0">
                  <div className="group-data-[collapsible=icon]:hidden">
                    <p className="text-xs text-primary-foreground/80 mb-3">Get AI price predictions, loan access, and more.</p>
                    <Button asChild size="sm" className="w-full bg-background text-foreground hover:bg-background/90">
                        <Link href="/pricing">Go Pro</Link>
                    </Button>
                  </div>
                   <div className="hidden group-data-[collapsible=icon]:block">
                     <Button asChild size="icon" className="h-8 w-8 bg-white text-primary hover:bg-white/90">
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
      <SidebarInset suppressHydrationWarning>
        <div className="p-4 sm:p-6 lg:p-8 !pt-0 min-h-screen bg-secondary/50">
          <header className="sticky top-0 z-10 flex items-center h-16 bg-background/80 backdrop-blur-sm md:hidden mb-4 -mx-4 px-4 border-b">
             <SidebarTrigger />
             <div className="flex items-center gap-2 mx-auto">
                <Wheat className="h-6 w-6 text-primary" />
                <h1 className="text-lg font-bold font-headline">AgriAssist</h1>
              </div>
          </header>
          <div className="py-8">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
