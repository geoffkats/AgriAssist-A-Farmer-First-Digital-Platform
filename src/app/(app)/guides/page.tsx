
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Video, FileText, Mic } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const guides = [
  { title: 'Video: Proper Fertilizer Application for Maize', type: 'Video', category: 'Crop Management', image: 'https://placehold.co/400x225', hint: 'farmer fertilizer' },
  { title: 'Guide: Identifying Fall Armyworm in Uganda', type: 'PDF', category: 'Pest Control', image: 'https://placehold.co/400x225', hint: 'maize pest' },
  { title: 'Audio: Post-Harvest Handling for Coffee Beans', type: 'Audio', category: 'Post-Harvest', image: 'https://placehold.co/400x225', hint: 'coffee beans' },
  { title: 'Video: Setting Up Drip Irrigation Systems', type: 'Video', category: 'Water Management', image: 'https://placehold.co/400x225', hint: 'drip irrigation' },
  { title: 'Guide: Soil Testing and Health Management', type: 'PDF', category: 'Soil Health', image: 'https://placehold.co/400x225', hint: 'soil sample' },
  { title: 'Audio: Market Negotiation Tactics for Smallholders', type: 'Audio', category: 'Business Skills', image: 'https://placehold.co/400x225', hint: 'market negotiation' },
];

const GuideIcon = ({ type }: { type: string }) => {
    if (type === 'Video') return <Video className="h-4 w-4" />;
    if (type === 'PDF') return <FileText className="h-4 w-4" />;
    if (type === 'Audio') return <Mic className="h-4 w-4" />;
    return null;
}

export default function GuidesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Knowledge Hub</h1>
        <p className="text-muted-foreground">Expert guides, tutorials, and tips to grow smarter.</p>
      </header>

       <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for guides..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="crop-management">Crop Management</SelectItem>
            <SelectItem value="pest-control">Pest Control</SelectItem>
            <SelectItem value="water-management">Water Management</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Card key={guide.title} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0 relative">
              <Image src={guide.image} alt={guide.title} width={400} height={225} className="object-cover w-full h-40" data-ai-hint={guide.hint} />
              <Badge className="absolute top-2 right-2">
                <GuideIcon type={guide.type} /> <span className="ml-1.5">{guide.type}</span>
              </Badge>
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <p className="text-xs text-primary font-semibold uppercase">{guide.category}</p>
              <h3 className="font-semibold text-lg mt-1">{guide.title}</h3>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                {guide.type === 'Video' && 'Watch Now'}
                {guide.type === 'PDF' && 'Read Guide'}
                {guide.type === 'Audio' && 'Listen Now'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
