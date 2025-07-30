
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProStatus } from '@/context/pro-status-context';
import { BarChart, Download, FileText, LineChart, Loader2, Star } from 'lucide-react';
import Link from 'next/link';

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
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LineChart className="text-primary"/> Yield Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Coming soon: Track your yield per acre over multiple seasons.</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary" disabled>View Chart</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart className="text-primary"/> Input Spending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Coming soon: Analyze your expenditure on seeds, fertilizers, etc.</p>
                    </CardContent>
                     <CardFooter>
                        <Button variant="secondary" disabled>View Chart</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Loader2 className="text-primary animate-spin"/> Revenue Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Coming soon: AI-powered revenue projections based on market data.</p>
                    </CardContent>
                     <CardFooter>
                        <Button variant="secondary" disabled>Run Forecast</Button>
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Automated Reports</CardTitle>
                    <CardDescription>Generate and download reports with a single click.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-semibold">Full Profit & Loss Statement</p>
                            <p className="text-sm text-muted-foreground">For banking or grant applications</p>
                        </div>
                        <Button disabled><Download className="mr-2" /> Download PDF</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-semibold">Input Spend Summary</p>
                            <p className="text-sm text-muted-foreground">For accounting and budgeting</p>
                        </div>
                        <Button disabled><FileText className="mr-2" /> Export CSV</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
