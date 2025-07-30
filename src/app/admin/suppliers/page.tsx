
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreHorizontal, Upload, CheckCircle, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const suppliers = [
  { id: 'SUP001', name: 'Agro Inputs Ltd.', location: 'Kampala', contact: 'info@agroinputs.co.ug', status: 'Verified', rating: 4.8, fulfillmentRate: '98%' },
  { id: 'SUP002', name: 'FarmCare Supplies', location: 'Jinja', contact: 'sales@farmcare.ug', status: 'Verified', rating: 4.5, fulfillmentRate: '95%' },
  { id: 'SUP003', name: 'Mbale Agro-Dealers', location: 'Mbale', contact: 'mbaledealers@email.com', status: 'Pending', rating: 4.2, fulfillmentRate: '92%' },
  { id: 'SUP004', name: 'Gulu Seed Co.', location: 'Gulu', contact: 'contact@guluseed.com', status: 'Verified', rating: 4.9, fulfillmentRate: '99%' },
];

const products = [
  { id: 'PROD01', name: 'Certified Maize Seeds (Longe 5)', supplier: 'Gulu Seed Co.', category: 'Seeds', price: '15,000', stock: 500, status: 'Active', image: 'https://placehold.co/40x40' },
  { id: 'PROD02', name: 'NPK 17-17-17 Fertilizer', supplier: 'Agro Inputs Ltd.', category: 'Fertilizers', price: '180,000', stock: 250, status: 'Active', image: 'https://placehold.co/40x40' },
  { id: 'PROD03', name: 'Organic Pesticide (Neem Oil)', supplier: 'FarmCare Supplies', category: 'Agrochemicals', price: '45,000', stock: 100, status: 'Inactive', image: 'https://placehold.co/40x40' },
  { id: 'PROD04', name: 'Urea Fertilizer', supplier: 'Agro Inputs Ltd.', category: 'Fertilizers', price: '150,000', stock: 300, status: 'Active', image: 'https://placehold.co/40x40' },
];

export default function SupplierManagementPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Supplier & Product Management</h1>
                <p className="text-muted-foreground">Manage vendors and the items they list in the Input Marketplace.</p>
            </header>

            <Tabs defaultValue="suppliers">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                        <TabsTrigger value="products">Products</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                        <div className="relative w-full max-w-sm">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="Search..." className="pl-10" />
                        </div>
                        <Button><Plus className="mr-2"/> Add New</Button>
                    </div>
                </div>

                <TabsContent value="suppliers" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Suppliers</CardTitle>
                             <CardDescription>View, edit, and verify suppliers on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Supplier ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Fulfillment Rate</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {suppliers.map(s => (
                                        <TableRow key={s.id}>
                                            <TableCell className="font-mono">{s.id}</TableCell>
                                            <TableCell className="font-medium">{s.name}</TableCell>
                                            <TableCell>{s.location}</TableCell>
                                            <TableCell>
                                                <Badge variant={s.status === 'Verified' ? 'default' : 'secondary'}>{s.status}</Badge>
                                            </TableCell>
                                            <TableCell>{s.fulfillmentRate}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                        <DropdownMenuItem>View Products</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-green-600">Approve</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
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

                <TabsContent value="products" className="mt-4">
                    <Card>
                         <CardHeader>
                            <CardTitle>All Products</CardTitle>
                             <CardDescription>Manage all products available in the marketplace.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Supplier</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price (UGX)</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map(p => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-medium flex items-center gap-3">
                                                <Image src={p.image} alt={p.name} width={40} height={40} className="rounded-md object-cover" />
                                                {p.name}
                                            </TableCell>
                                            <TableCell>{p.supplier}</TableCell>
                                            <TableCell>{p.category}</TableCell>
                                            <TableCell>{p.price}</TableCell>
                                            <TableCell>
                                                <Badge variant={p.status === 'Active' ? 'default' : 'outline'}>{p.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                                                        <DropdownMenuItem>Deactivate</DropdownMenuItem>
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
