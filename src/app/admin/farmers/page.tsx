
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { users as appUsers } from '@/lib/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Search, Plus, X, Wand2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';


export default function FarmerManagementPage() {
  const [users, setUsers] = useState(appUsers.getUsers().filter(u => u.role !== 'admin'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const openModal = (user:any = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  const openDeleteModal = (user:any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Farmer Management</h1>
        <p className="text-muted-foreground">View, edit, suspend or verify any user.</p>
      </header>
       <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by name, email, or phone..." className="pl-10" />
        </div>
        <Button onClick={() => openModal()}><Plus className="mr-2"/> Add New Farmer</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registered Farmers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>AI Credits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.isPro ? 'default' : 'secondary'}>
                      {user.isPro ? 'Pro' : 'Free'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Wand2 className="h-4 w-4 text-primary" />
                       {user.isPro ? 'Unlimited' : user.aiCredits}
                    </div>
                  </TableCell>
                   <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openModal(user)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
                        <DropdownMenuItem>Manually Upgrade to Pro</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => openDeleteModal(user)}>Suspend Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'Edit Farmer Profile' : 'Add New Farmer'}</DialogTitle>
            <DialogDescription>
              {selectedUser ? `Editing profile for ${selectedUser.name}` : 'Enter the details for the new farmer.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" defaultValue={selectedUser?.name || ''} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" defaultValue={selectedUser?.email || ''} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Pro Status</Label>
              <div className="col-span-3 flex items-center">
                 <Switch id="pro-status" checked={selectedUser?.isPro || false} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsModalOpen(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to suspend this account?</DialogTitle>
                <DialogDescription>
                    This action will temporarily disable {selectedUser?.name}'s access to the platform. They will not be able to log in. This action can be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={() => setIsDeleteModalOpen(false)}>Yes, Suspend Account</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
