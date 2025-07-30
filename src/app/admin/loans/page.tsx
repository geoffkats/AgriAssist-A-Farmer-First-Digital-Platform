
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle, MoreHorizontal, FileText, Download, SlidersHorizontal, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const applications = [
    { id: 'LOAN-0721', farmer: 'John Mubiru', amount: 'UGX 1,500,000', purpose: 'Maize Seeds & Fertilizer', risk: 'Low', status: 'Pending', date: '2024-07-21' },
    { id: 'LOAN-0720', farmer: 'Aisha Nakato', amount: 'UGX 800,000', purpose: 'Pesticides for Coffee', risk: 'Medium', status: 'Approved', date: '2024-07-20' },
    { id: 'LOAN-0719', farmer: 'Peter Okello', amount: 'UGX 2,000,000', purpose: 'Irrigation Pump', risk: 'High', status: 'Rejected', date: '2024-07-19' },
    { id: 'LOAN-0718', farmer: 'Maria Akello', amount: 'UGX 500,000', purpose: 'Bean Seeds', risk: 'Low', status: 'Pending', date: '2024-07-18' },
];

const repayments = [
    { id: 'REPAY-0615', loanId: 'LOAN-0601', farmer: 'Aisha Nakato', amount: 'UGX 200,000', date: '2024-07-15', status: 'Paid' },
    { id: 'REPAY-0614', loanId: 'LOAN-0525', farmer: 'David Lumu', amount: 'UGX 400,000', date: '2024-07-14', status: 'Overdue' },
];

export default function LoanManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);

    const openModal = (app:any, action: 'approve' | 'reject' | 'view') => {
        setSelectedApplication(app);
        if (action === 'approve' || action === 'reject') {
            setDecision(action);
        } else {
            setDecision(null);
        }
        setIsModalOpen(true);
    };

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
                                                        <DropdownMenuItem onClick={() => openModal(app, 'view')}>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-green-600 flex items-center gap-2" onClick={() => openModal(app, 'approve')}><CheckCircle size={16}/> Approve</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive flex items-center gap-2" onClick={() => openModal(app, 'reject')}><XCircle size={16}/> Reject</DropdownMenuItem>
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
                            <CardTitle>Credit Scoring Model Configuration</CardTitle>
                            <CardDescription>Adjust the parameters for the AI-powered loan risk assessment model.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg font-headline flex items-center gap-2">
                                        <SlidersHorizontal className="text-primary"/>
                                        Financial Parameters
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="interest-rate">Base Interest Rate (%)</Label>
                                        <Input id="interest-rate" defaultValue="18.5" type="number" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lti-ratio">Max Loan-to-Income Ratio (%)</Label>
                                        <Input id="lti-ratio" defaultValue="35" type="number" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="repayment-cycle">Default Repayment Cycle</Label>
                                        <Select defaultValue="monthly">
                                            <SelectTrigger id="repayment-cycle">
                                                <SelectValue placeholder="Select cycle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                                <SelectItem value="biannually">Bi-Annually</SelectItem>
                                                <SelectItem value="bullet">Bullet (End of Term)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="grace-period">Grace Period (days)</Label>
                                        <Input id="grace-period" defaultValue="30" type="number" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Financial Rules</Button>
                                </CardFooter>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg font-headline flex items-center gap-2">
                                        <SlidersHorizontal className="text-primary"/>
                                        AI Model Factors
                                    </CardTitle>
                                    <CardDescription>Enable or disable data points used in risk scoring.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <Label htmlFor="tx-history">Use In-App Transaction History</Label>
                                        <Switch id="tx-history" defaultChecked />
                                    </div>
                                     <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <Label htmlFor="yield-data">Use Farmer-Logged Yield Data</Label>
                                        <Switch id="yield-data" defaultChecked />
                                    </div>
                                     <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <Label htmlFor="pro-status">Weight Pro Subscription Status</Label>
                                        <Switch id="pro-status" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <Label htmlFor="coop-membership">Weight Co-operative Membership</Label>
                                        <Switch id="coop-membership" />
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <Label htmlFor="crb-check">Enable External CRB Check (API)</Label>
                                        <Switch id="crb-check" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Model Weights</Button>
                                </CardFooter>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                             {decision === 'approve' && `Approve Loan Application?`}
                             {decision === 'reject' && `Reject Loan Application?`}
                             {!decision && `Loan Application Details`}
                        </DialogTitle>
                        <DialogDescription>
                            {decision === 'approve' && `This will mark loan ${selectedApplication?.id} as approved and notify the applicant.`}
                            {decision === 'reject' && `This will mark loan ${selectedApplication?.id} as rejected and notify the applicant.`}
                            {!decision && `Reviewing details for loan ${selectedApplication?.id} for ${selectedApplication?.farmer}.`}
                        </DialogDescription>
                    </DialogHeader>
                    {decision ? (
                         <DialogFooter>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button 
                                variant={decision === 'approve' ? 'default' : 'destructive'} 
                                onClick={() => setIsModalOpen(false)}
                            >
                                {decision === 'approve' ? 'Yes, Approve' : 'Yes, Reject'}
                            </Button>
                        </DialogFooter>
                    ) : (
                         <div className="py-4 space-y-4">
                            <p><strong>Farmer:</strong> {selectedApplication?.farmer}</p>
                            <p><strong>Amount:</strong> {selectedApplication?.amount}</p>
                            <p><strong>Purpose:</strong> {selectedApplication?.purpose}</p>
                            <p><strong>AI Risk Assessment:</strong> <Badge variant={selectedApplication?.risk === 'Low' ? 'default' : selectedApplication?.risk === 'Medium' ? 'secondary' : 'destructive'}>{selectedApplication?.risk}</Badge></p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
