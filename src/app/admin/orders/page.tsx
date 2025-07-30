
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal, Truck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const orders = [
    { id: 'ORD-9871', user: 'John Mubiru', items: 2, total: 'UGX 225,000', status: 'Shipped', courier: 'SafeBoda', date: '2024-07-21' },
    { id: 'ORD-9870', user: 'Aisha Nakato', items: 1, total: 'UGX 45,000', status: 'Delivered', courier: 'Self-pickup', date: '2024-07-20' },
    { id: 'ORD-9869', user: 'Peter Okello', items: 5, total: 'UGX 980,000', status: 'Processing', courier: 'TBD', date: '2024-07-21' },
    { id: 'ORD-9868', user: 'Maria Akello', items: 1, total: 'UGX 12,000', status: 'Failed Delivery', courier: 'Local Boda', date: '2024-07-19' },
];

export default function OrdersManagementPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Marketplace Orders & Logistics</h1>
                <p className="text-muted-foreground">Manage input orders, delivery tracking, and fulfillment.</p>
            </header>

            <Tabs defaultValue="all-orders">
                 <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="all-orders">All Orders</TabsTrigger>
                        <TabsTrigger value="processing">Processing</TabsTrigger>
                        <TabsTrigger value="shipped">Shipped</TabsTrigger>
                        <TabsTrigger value="complaints">Refunds & Complaints</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                        <div className="relative w-full max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Search by Order ID or User..." className="pl-10" />
                        </div>
                    </div>
                </div>

                <TabsContent value="all-orders" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Marketplace Orders</CardTitle>
                            <CardDescription>A complete log of all orders placed on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map(order => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-mono">{order.id}</TableCell>
                                            <TableCell className="font-medium">{order.user}</TableCell>
                                            <TableCell>{order.total}</TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant={order.status === 'Delivered' ? 'default' : order.status === 'Shipped' ? 'secondary' : order.status === 'Processing' ? 'outline' : 'destructive'}
                                                >
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell className="text-right">
                                                 <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon"><MoreHorizontal/></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Order Details</DropdownMenuItem>
                                                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center gap-2"><Truck size={16} /> Assign Courier</DropdownMenuItem>
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
            </Tabs>
        </div>
    );
}
