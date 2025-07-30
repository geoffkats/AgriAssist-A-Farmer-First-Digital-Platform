import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Rss, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const forums = [
  { name: 'Maize Growers', members: 12500, newPosts: 45, icon: <Rss className="h-5 w-5 text-amber-500" /> },
  { name: 'Coffee Farmers Uganda', members: 8700, newPosts: 23, icon: <Rss className="h-5 w-5 text-amber-500" /> },
  { name: 'Kampala Urban Farmers', members: 3400, newPosts: 12, icon: <Rss className="h-5 w-5 text-amber-500" /> },
  { name: 'Gulu Agri-preneurs', members: 5600, newPosts: 31, icon: <Rss className="h-5 w-5 text-amber-500" /> },
];

export default function CommunityPage() {
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
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <Tabs defaultValue="forums">
        <TabsList>
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="forums">
          <div className="grid gap-4 mt-4 md:grid-cols-2">
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
         <TabsContent value="my-posts">
            <div className="text-center py-16">
                <p className="text-muted-foreground">You haven't posted anything yet.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
