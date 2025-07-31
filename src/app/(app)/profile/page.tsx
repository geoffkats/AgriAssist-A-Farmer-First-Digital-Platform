
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import { Upload, Linkedin, Globe, Shield, Bell, Lock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    const isBuyer = user.role === 'buyer';

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal and business information.</p>
            </header>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Profile</CardTitle>
                            <CardDescription>This information will be displayed on your public profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={`https://placehold.co/100x100?text=${user.name.charAt(0)}`} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                     <Label htmlFor="profile-picture">Profile Picture</Label>
                                    <div className="flex gap-2">
                                        <Button variant="outline"><Upload className="mr-2"/> Upload New</Button>
                                        <Button variant="ghost">Remove</Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Recommended: 400x400px, JPG or PNG</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue={user.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" defaultValue={user.email} disabled />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">About Me / My Business</Label>
                                <Textarea id="bio" placeholder={isBuyer ? "Describe your company, the crops you source, and your quality standards..." : "Tell the community a little about your farm and experience..."} rows={4} />
                            </div>
                        </CardContent>
                    </Card>

                    {isBuyer && (
                         <Card>
                            <CardHeader>
                                <CardTitle>Business Information</CardTitle>
                                <CardDescription>Provide details to build trust with farmers and co-ops.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="company-name">Company Name</Label>
                                    <Input id="company-name" defaultValue={user.name} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="website">Company Website</Label>
                                    <div className="flex items-center gap-2">
                                        <Globe className="text-muted-foreground"/>
                                        <Input id="website" placeholder="https://yourcompany.com" />
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label>Certifications & Documents</Label>
                                    <div className="p-4 border-2 border-dashed rounded-lg text-center">
                                        <Upload className="mx-auto h-8 w-8 text-muted-foreground"/>
                                        <p className="mt-2 text-sm text-muted-foreground">Drag & drop or click to upload business registration, quality certificates, etc.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                         <CardHeader>
                            <CardTitle>Social Profiles</CardTitle>
                            <CardDescription>Link your social media accounts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <div className="flex items-center gap-2">
                                    <Linkedin className="text-muted-foreground"/>
                                    <Input id="linkedin" placeholder="linkedin.com/in/yourprofile" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website / Portfolio</Label>
                                <div className="flex items-center gap-2">
                                    <Globe className="text-muted-foreground"/>
                                    <Input id="website" placeholder="yourfarm.com" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <CardFooter className="justify-end border-t pt-6">
                        <Button size="lg">Save All Changes</Button>
                    </CardFooter>
                </div>

                <div className="lg:col-span-1 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Lock className="text-primary"/> Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password"/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password"/>
                            </div>
                            <Button>Change Password</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bell className="text-primary"/> Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="price-alerts" className="flex-grow">Price Alerts</Label>
                                <Switch id="price-alerts" defaultChecked/>
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="community-mentions" className="flex-grow">Community Mentions</Label>
                                <Switch id="community-mentions" defaultChecked/>
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="marketplace-updates" className="flex-grow">Marketplace Updates</Label>
                                <Switch id="marketplace-updates" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

