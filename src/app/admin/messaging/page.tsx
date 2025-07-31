
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Bell, Inbox, User, MapPin, Wheat } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const supportTickets = [
    { id: 'TKT-5432', subject: 'My fertilizer order is late', user: 'John Mubiru', status: 'Open', date: '2024-07-21' },
    { id: 'TKT-5431', subject: 'Cannot access AI Agronomist', user: 'Aisha Nakato', status: 'Closed', date: '2024-07-20' },
    { id: 'TKT-5430', subject: 'Question about loan repayment', user: 'Peter Okello', status: 'Open', date: '2024-07-21' },
];

export default function MessagingPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Messaging & Notifications</h1>
                <p className="text-muted-foreground">Manage all communications with users.</p>
            </header>

             <Tabs defaultValue="broadcast">
                <TabsList>
                    <TabsTrigger value="broadcast"><Send className="mr-2"/>Broadcast Notifications</TabsTrigger>
                    <TabsTrigger value="support"><Inbox className="mr-2"/>Support Tickets</TabsTrigger>
                </TabsList>

                <TabsContent value="broadcast" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Compose New Broadcast</CardTitle>
                            <CardDescription>Send a message to a targeted group of users.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                           <div className="space-y-2">
                                <Label htmlFor="message" className="text-base">Message</Label>
                                <Textarea id="message" placeholder="Type your notification message here. You can include details about new features, market price alerts, or important announcements." rows={4} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="text-base">Target Audience</Label>
                                    <div className="space-y-4">
                                        <Select defaultValue="all">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select user group" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all"><User className="mr-2"/>All Users</SelectItem>
                                                <SelectItem value="pro"><User className="mr-2"/>Pro Users Only</SelectItem>
                                                <SelectItem value="free"><User className="mr-2"/>Free Users Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Filter by region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all"><MapPin className="mr-2"/>All Regions</SelectItem>
                                                <SelectItem value="kampala">Kampala</SelectItem>
                                                <SelectItem value="gulu">Gulu</SelectItem>
                                                <SelectItem value="mbarara">Mbarara</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Filter by crop" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all"><Wheat className="mr-2"/>All Crops</SelectItem>
                                                <SelectItem value="maize">Maize Growers</SelectItem>
                                                <SelectItem value="coffee">Coffee Farmers</SelectItem>
                                                <SelectItem value="beans">Bean Farmers</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-base">Delivery Channels</Label>
                                    <div className="flex flex-col gap-4 p-4 border rounded-md bg-secondary/50">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="push" defaultChecked />
                                            <Label htmlFor="push" className="font-normal">Push Notification</Label>
                                        </div>
                                         <div className="flex items-center space-x-2">
                                            <Checkbox id="sms" />
                                            <Label htmlFor="sms" className="font-normal">SMS Fallback (for users without data)</Label>
                                        </div>
                                         <div className="flex items-center space-x-2">
                                            <Checkbox id="in-app" />
                                            <Label htmlFor="in-app" className="font-normal">In-App Banner</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button size="lg"><Send className="mr-2" /> Send Broadcast</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="support" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Support Inbox</CardTitle>
                            <CardDescription>View and reply to incoming support requests from users.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {supportTickets.map(ticket => (
                                <div key={ticket.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                                    <div>
                                        <p className="font-semibold">{ticket.subject}</p>
                                        <p className="text-sm text-muted-foreground">{ticket.user} - {ticket.date}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant={ticket.status === 'Open' ? 'destructive' : 'default'}>{ticket.status}</Badge>
                                        <Button variant="outline" size="sm">View Ticket</Button>
                                    </div>
                                </div>
                           ))}
                        </CardContent>
                    </Card>
                </TabsContent>
             </Tabs>
        </div>
    );
}
