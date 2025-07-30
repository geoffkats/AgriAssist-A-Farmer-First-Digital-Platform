
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle, MoreHorizontal, FileText, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const applications = [
    { id: 'LOAN-0721', farmer: 'John Mubiru', amount: 'UGX 1,500,000', purpose: 'Maize Seeds & Fertilizer', risk: 'Low', status: 'Pending', date: '2024-07-21' },
    { id: 'LOAN-0720', farmer: 'Aisha Nakato', amount: 'UGX 800,000', purpose: 'Pesticides for Coffee', risk: 'Medium', status: 'Approved', date: '2024-07-20' },
    { id: 'LOAN-0719', farmer: 'Peter Okello', amount: 'UGX 2,000,000', purpose: 'Irrigation Pump', risk: 'High', status: 'Rejected', date: '2024-07-19' },
    { id: 'LOAN-0718', farmer: 'Maria Akello', amount: 'UGX 500,000', purpose: 'Bean Seeds', risk: 'Low', status: 'Pending', date: '2024-07-18' },
];

const repayments = [
    { id: 'REPAY-0615', loanId: 'LOAN-0601', farmer: 'Aisha Nakato', amount: 'UGX 200,000', date: '2024-07-15', status: 'Paid' },
    { id: 'REPAY-0614', loanId: 'LOAN-0525', farmer: 'David Lumu', amount: 'UGX 400,000', date: '2024-07-14', status: 'Overdue' },
]

export default function LoanManagementPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Loan & Credit Management</h1>
                <p className="text-muted-foreground">Review and administer AgriAssist Credit applications and repayments.</p>
            </header>

            <Tabs defaultValue="applications">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="applications">Applications</TabsTrigger>
                        <TabsTrigger value="repayments">Repayments</TabsTrigger>
                        <TabsTrigger value="settings">Credit Settings</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                         <div className="relative w-full max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Search by Farmer or ID..." className="pl-10" />
                        </div>
                    </div>
                </div>

                <TabsContent value="applications" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Loan Applications</CardTitle>
                            <CardDescription>Review pending loan applications and make approval decisions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Loan ID</TableHead>
                                        <TableHead>Farmer</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>AI Risk</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {applications.map(app => (
                                        <TableRow key={app.id}>
                                            <TableCell className="font-mono">{app.id}</TableCell>
                                            <TableCell className="font-medium">{app.farmer}</TableCell>
                                            <TableCell>{app.amount}</TableCell>
                                            <TableCell>
                                                <Badge variant={app.risk === 'Low' ? 'default' : app.risk === 'Medium' ? 'secondary' : 'destructive'}>{app.risk}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={app.status === 'Approved' ? 'default' : app.status === 'Pending' ? 'outline' : 'destructive'}>{app.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                 <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon"><MoreHorizontal/></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-green-600 flex items-center gap-2"><CheckCircle size={16}/> Approve</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive flex items-center gap-2"><XCircle size={16}/> Reject</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="repayments" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Repayment Status</CardTitle>
                            <CardDescription>Track upcoming and overdue loan repayments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Repayment ID</TableHead>
                                        <TableHead>Farmer</TableHead>
                                        <TableHead>Amount Due</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {repayments.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-mono">{item.id}</TableCell>
                                            <TableCell className="font-medium">{item.farmer}</TableCell>
                                            <TableCell>{item.amount}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === 'Paid' ? 'default' : 'destructive'}>{item.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm">Send Reminder</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Credit Settings</CardTitle>
                            <CardDescription>Configure the rules for the AI-powered credit scoring model.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p>Credit settings UI coming soon...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
