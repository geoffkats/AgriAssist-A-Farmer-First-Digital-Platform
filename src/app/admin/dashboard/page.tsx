
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BarChart, Users, ShoppingCart, Banknote, AlertTriangle } from 'lucide-react';
import { users as appUsers } from '@/lib/users';


const kpiData = [
  { title: "Active Users (DAU)", value: "1,245", icon: Users, change: "+5.2%" },
  { title: "Total Sales Volume", value: "UGX 45.8M", icon: ShoppingCart, change: "+12.1%" },
  { title: "Loans Issued (Today)", value: "UGX 12.3M", icon: Banknote, change: "+8.0%" },
  { title: "System Alerts", value: "2", icon: AlertTriangle, change: "Critical" },
];

const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 450 },
  { name: 'May', users: 600 },
  { name: 'Jun', users: 800 },
  { name: 'Jul', users: 1245 },
];


export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Admin Overview</h1>
        <p className="text-muted-foreground">A high-level snapshot of real-time platform activity.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change} from last period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Total user registrations over time.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={userGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
                            <YAxis tick={{ fontSize: 12 }}/>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                            <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsers)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Activity Heatmap</CardTitle>
                <CardDescription>Coming soon: Top performing regions by activity.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[300px] bg-secondary/50 rounded-md">
                <p className="text-muted-foreground">Map visualization placeholder</p>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
