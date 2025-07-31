
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProStatus } from '@/context/pro-status-context';
import { BarChart as BarChartIcon, Download, FileText, LineChart, Star, Sun, Cloud, CloudRain, Wind, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line as RechartsLine, LineChart as RechartsLineChart, BarChart as RechartsBarChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


const yieldData = [
  { season: '2022-A', maize: 2.5, beans: 1.2 },
  { season: '2022-B', maize: 2.8, beans: 1.5 },
  { season: '2023-A', maize: 3.2, beans: 1.4 },
  { season: '2023-B', maize: 3.0, beans: 1.6 },
  { season: '2024-A', maize: 3.5, beans: 1.8 },
];

const spendingData = [
  { month: 'Jan', seeds: 150000, fertilizers: 250000, agrochemicals: 80000 },
  { month: 'Feb', seeds: 180000, fertilizers: 300000, agrochemicals: 100000 },
  { month: 'Mar', seeds: 120000, fertilizers: 200000, agrochemicals: 70000 },
  { month: 'Apr', seeds: 250000, fertilizers: 400000, agrochemicals: 150000 },
  { month: 'May', seeds: 90000, fertilizers: 150000, agrochemicals: 50000 },
];

const revenueForecastData = [
    { month: 'Aug', revenue: 4500000 },
    { month: 'Sep', revenue: 4800000 },
    { month: 'Oct', revenue: 5200000 },
    { month: 'Nov', revenue: 6000000 },
    { month: 'Dec', revenue: 7500000 },
];

const weatherData = {
    current: { temp: 24, condition: 'Partly Cloudy', icon: Cloud, wind: '12 km/h' },
    forecast: [
        { day: 'Tue', temp: 26, icon: Sun },
        { day: 'Wed', temp: 22, icon: CloudRain },
        { day: 'Thu', temp: 25, icon: Cloud },
        { day: 'Fri', temp: 27, icon: Sun },
        { day: 'Sat', temp: 23, icon: CloudRain },
    ]
}

export default function AnalyticsPage() {
    const { isPro } = useProStatus();

    if (!isPro) {
        return (
            <div className="flex flex-col gap-8 items-center justify-center min-h-[calc(100vh-10rem)] text-center">
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>Unlock Advanced Analytics</CardTitle>
                        <CardDescription>This powerful feature is available exclusively for Pro subscribers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-muted-foreground">Upgrade your plan to access customizable dashboards, automated reports, and predictive revenue forecasts.</p>
                        <Button asChild>
                        <Link href="/pricing">
                            <Star className="mr-2 h-4 w-4" />
                            Upgrade to Pro
                        </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Analytics & Reporting</h1>
                <p className="text-muted-foreground">Your farm's performance at a glance. Make data-driven decisions.</p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sun className="text-primary"/> Weather Forecast</CardTitle>
                        <CardDescription>5-Day Forecast for Kampala</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                             <div>
                                <p className="text-sm">Now</p>
                                <p className="text-4xl font-bold">{weatherData.current.temp}°C</p>
                                <p className="text-muted-foreground">{weatherData.current.condition}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <weatherData.current.icon className="h-12 w-12 text-primary" />
                                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                                    <Wind className="h-4 w-4" /> {weatherData.current.wind}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            {weatherData.forecast.map(day => (
                                <div key={day.day} className="flex flex-col items-center gap-1 text-center">
                                    <p className="text-sm font-semibold">{day.day}</p>
                                    <day.icon className="h-8 w-8 text-muted-foreground" />
                                    <p className="text-lg font-bold">{day.temp}°</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart2 className="text-primary"/> Yield Performance (Tons/Acre)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                             <RechartsBarChart data={yieldData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="season" tick={{ fontSize: 12 }} tickLine={false} axisLine={false}/>
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false}/>
                                <Tooltip
                                    cursor={{fill: 'hsl(var(--muted))'}}
                                    content={<ChartTooltipContent />}
                                />
                                <Legend />
                                <Bar dataKey="maize" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="beans" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AreaChart className="text-primary"/> Input Spending Analysis (UGX)</CardTitle>
                         <CardDescription>Monthly expenditure on farm inputs.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                       <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={spendingData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" tick={{fontSize: 12}} />
                                <YAxis tick={{fontSize: 12}} tickFormatter={(value) => `${value/1000}k`} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Area type="monotone" dataKey="seeds" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.4} />
                                <Area type="monotone" dataKey="fertilizers" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.4} />
                                <Area type="monotone" dataKey="agrochemicals" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.4} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LineChart className="text-primary"/> AI Revenue Forecast (UGX)</CardTitle>
                        <CardDescription>Projected revenue based on current yield and market trends.</CardDescription>
                    </CardHeader>
                     <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={revenueForecastData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" tick={{fontSize: 12}}/>
                                <YAxis tick={{fontSize: 12}} tickFormatter={(value) => `${value/1000000}M`}/>
                                <Tooltip content={<ChartTooltipContent />} />
                                <RechartsLine type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 6}} activeDot={{r: 8}}/>
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Automated Reports</CardTitle>
                    <CardDescription>Generate and download reports with a single click.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">Full Profit & Loss Statement</TableCell>
                                <TableCell className="text-muted-foreground">For banking or grant applications</TableCell>
                                <TableCell className="text-right">
                                    <Button><Download className="mr-2" /> Download PDF</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-semibold">Input Spend Summary</TableCell>
                                <TableCell className="text-muted-foreground">For accounting and budgeting</TableCell>
                                <TableCell className="text-right">
                                    <Button><FileText className="mr-2" /> Export CSV</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
