
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 200 },
  { name: 'Feb', revenue: 350 },
  { name: 'Mar', revenue: 400 },
  { name: 'Apr', revenue: 550 },
  { name: 'May', revenue: 600 },
  { name: 'Jun', revenue: 800 },
  { name: 'Jul', revenue: 1100 },
];

export default function FinancialsPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Financial & Subscription Control</h1>
                <p className="text-muted-foreground">Track AgriAssist’s revenue and Pro user base.</p>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue (MRR)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">UGX 1,100,000</div>
                        <p className="text-xs text-muted-foreground">+28% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pro Subscribers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">220</div>
                        <p className="text-xs text-muted-foreground">+15 from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Marketplace GMV</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">UGX 45,800,000</div>
                        <p className="text-xs text-muted-foreground">Gross merchandise value this month</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex items-center justify-between">
                    <div>
                        <CardTitle>Subscription Revenue Growth</CardTitle>
                        <CardDescription>Monthly recurring revenue from Pro subscriptions.</CardDescription>
                    </div>
                    <Button variant="outline"><Download className="mr-2"/> Export CSV</Button>
                </CardHeader>
                <CardContent>
                     <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
                                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `UGX ${value/1000}k`}/>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
