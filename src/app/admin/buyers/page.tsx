
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreHorizontal, CheckCircle, ShieldCheck, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const buyers = [
    { id: 'BUY001', name: 'Kampala Agro Processors', contact: 'procurement@kpl-agro.com', type: 'Processor', status: 'Verified', trades: 124, crops: 'Maize, Beans' },
    { id: 'BUY002', name: 'Jinja Coffee Exporters', contact: 'exports@jinja-coffee.co', type: 'Exporter', status: 'Verified', trades: 88, crops: 'Coffee' },
    { id: 'BUY003', name: 'Mbarara Fresh Produce', contact: 'fresh@mbarara.co', type: 'Aggregator', status: 'Pending', trades: 0, crops: 'Matooke, Cassava' },
    { id: 'BUY004', name: 'Northern Grain Co-op', contact: 'info@ngc.coop', type: 'Co-operative', status: 'Verified', trades: 212, crops: 'Millet, Sorghum' },
];

export default function BuyerManagementPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Buyer & Co-op Network</h1>
                <p className="text-muted-foreground">Manage buyers (off-takers, processors, exporters) & co-ops.</p>
            </header>

            <Tabs defaultValue="buyers">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="buyers">Buyers</TabsTrigger>
                        <TabsTrigger value="co-ops">Co-operatives</TabsTrigger>
                    </TabsList>
                     <div className="flex gap-2">
                        <div className="relative w-full max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Search..." className="pl-10" />
                        </div>
                        <Button><Plus className="mr-2"/> Add New Buyer</Button>
                    </div>
                </div>

                <TabsContent value="buyers" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Buyer Profiles</CardTitle>
                            <CardDescription>Manage and verify all buyers and off-takers in the network.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Buyer Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Crops of Interest</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {buyers.map(b => (
                                        <TableRow key={b.id}>
                                            <TableCell className="font-medium">{b.name}</TableCell>
                                            <TableCell>{b.type}</TableCell>
                                            <TableCell>{b.crops}</TableCell>
                                            <TableCell>
                                                <Badge variant={b.status === 'Verified' ? 'default' : 'outline'}>{b.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                 <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon"><MoreHorizontal/></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center gap-2"><Download size={16}/> View Documents</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-green-600 flex items-center gap-2"><CheckCircle size={16}/> Verify Buyer</DropdownMenuItem>
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
                <TabsContent value="co-ops" className="mt-4">
                     <Card className="flex flex-col items-center justify-center min-h-[400px]">
                        <CardHeader>
                            <CardTitle>Co-operative Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Co-op features coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
