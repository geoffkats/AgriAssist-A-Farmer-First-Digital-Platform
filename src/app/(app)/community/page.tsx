
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Rss, Search, MoreHorizontal, ThumbsUp, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const forums = [
  { name: 'Maize Growers', members: 12500, newPosts: 45, icon: <Rss className="h-5 w-5 text-amber-500" /> },
  { name: 'Coffee Farmers Uganda', members: 8700, newPosts: 23, icon: <Rss className="h-5 w-5 text-amber-500" /> },
  { name: 'Kampala Urban Farmers', members: 3400, newPosts: 12, icon: <Rss className="h-5 w-5 text-amber-500" /> },
  { name: 'Gulu Agri-preneurs', members: 5600, newPosts: 31, icon: <Rss className="h-5 w-5 text-amber-500" /> },
];

const myPosts = [
    {
        id: 1,
        title: "Question about Fall Armyworm",
        content: "I've been seeing signs of Fall Armyworm in my maize crop for the past week. Has anyone tried using organic neem oil solutions? How effective was it and what was your application ratio?",
        likes: 12,
        comments: 4,
        date: "2 days ago"
    },
    {
        id: 2,
        title: "Good source for NPK fertilizer in Mbarara?",
        content: "Looking for a reliable supplier of NPK 17-17-17 fertilizer around Mbarara. The prices in the marketplace seem a bit high. Any local recommendations?",
        likes: 8,
        comments: 2,
        date: "5 days ago"
    }
]

export default function CommunityPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  const openEditModal = (post: any) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };
  
  const openDeleteModal = (post: any) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };


  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Farmer Community</h1>
        <p className="text-muted-foreground">Connect, learn, and share with fellow farmers.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search forums or posts..." className="pl-10" />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <Tabs defaultValue="forums">
        <TabsList>
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="forums" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {forums.map((forum) => (
              <Card key={forum.name}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">{forum.icon}</div>
                    <CardTitle className="font-headline text-xl">{forum.name}</CardTitle>
                  </div>
                  <Button variant="outline" size="sm">Join</Button>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{forum.members.toLocaleString()} members</span>
                    <span>{forum.newPosts} new posts today</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
         <TabsContent value="my-posts" className="mt-4">
            <div className="space-y-4">
              {myPosts.map(post => (
                <Card key={post.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => openEditModal(post)}>Edit Post</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive" onClick={() => openDeleteModal(post)}>Delete Post</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4"/> {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4"/> {post.comments}
                        </div>
                    </CardFooter>
                </Card>
              ))}
            </div>
        </TabsContent>
      </Tabs>
      
      {/* Create Post Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogDescription>Share your knowledge or ask a question to the community.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input id="post-title" placeholder="e.g., Question about fertilizer"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="post-content">Content</Label>
                    <Textarea id="post-content" placeholder="Share details here..." rows={5}/>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsCreateModalOpen(false)}>Post to Community</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Post Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogDescription>Make changes to your post.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="edit-post-title">Title</Label>
                    <Input id="edit-post-title" defaultValue={selectedPost?.title} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="edit-post-content">Content</Label>
                    <Textarea id="edit-post-content" defaultValue={selectedPost?.content} rows={5}/>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsEditModalOpen(false)}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      
       {/* Delete Post Modal */}
       <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                <DialogDescription>This action cannot be undone. Your post will be permanently removed from the community.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={() => setIsDeleteModalOpen(false)}>Yes, Delete Post</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
