
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Shield, Trash2, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';


const adminUsers = [
    { name: 'Admin User', email: 'admin@agriassist.app', role: 'Super Admin', twoFactor: true },
    { name: 'Support Agent', email: 'support@agriassist.app', role: 'Content Admin', twoFactor: false },
    { name: 'Loan Officer', email: 'loans@agriassist.app', role: 'Loan Officer', twoFactor: true },
];

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Settings & Admin Roles</h1>
                <p className="text-muted-foreground">Control platform-wide settings and admin permissions.</p>
            </header>

            <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general">General Config</TabsTrigger>
                    <TabsTrigger value="admins">Admin Users & Roles</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>General App Configuration</CardTitle>
                            <CardDescription>Manage platform-wide settings like pricing and categories.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Subscription Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="monthly-price">Pro Plan - Monthly Price (UGX)</Label>
                                        <Input id="monthly-price" defaultValue="5000"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="yearly-price">Pro Plan - Yearly Price (UGX)</Label>
                                        <Input id="yearly-price" defaultValue="50000"/>
                                    </div>
                                    <Button>Save Pricing</Button>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">App Categories</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="crop-cats">Crop Categories (comma separated)</Label>
                                        <Input id="crop-cats" defaultValue="Maize, Beans, Coffee, Cassava, Matooke"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="input-cats">Input Categories (comma separated)</Label>
                                        <Input id="input-cats" defaultValue="Seeds, Fertilizers, Agrochemicals, Tools"/>
                                    </div>
                                    <Button>Save Categories</Button>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="admins" className="mt-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Admin Users</CardTitle>
                                <CardDescription>Manage who has access to this admin dashboard.</CardDescription>
                            </div>
                            <Button><Plus className="mr-2"/> Invite Admin</Button>
                        </CardHeader>
                        <CardContent>
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>User</TableHead>
                                       <TableHead>Role</TableHead>
                                       <TableHead>2FA Enabled</TableHead>
                                       <TableHead className="text-right">Actions</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {adminUsers.map(user => (
                                       <TableRow key={user.email}>
                                           <TableCell>
                                               <div className="font-medium">{user.name}</div>
                                               <div className="text-sm text-muted-foreground">{user.email}</div>
                                           </TableCell>
                                           <TableCell>
                                               <div className="flex items-center gap-2">
                                                    <Shield size={16} className="text-primary"/>
                                                    {user.role}
                                               </div>
                                           </TableCell>
                                           <TableCell>
                                               <Switch checked={user.twoFactor}/>
                                           </TableCell>
                                           <TableCell className="text-right">
                                               <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                                   <Trash2 size={16}/>
                                               </Button>
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
