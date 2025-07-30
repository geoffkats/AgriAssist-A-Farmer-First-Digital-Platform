
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Phone, Mail } from 'lucide-react';

const buyers = [
  {
    name: 'Kampala Agro Processors',
    location: 'Kampala',
    crops: ['Maize', 'Beans', 'Soy'],
    avatar: 'https://placehold.co/100x100',
    initials: 'KA'
  },
  {
    name: 'Gulu Grain Millers',
    location: 'Gulu',
    crops: ['Maize', 'Millet', 'Sorghum'],
    avatar: 'https://placehold.co/100x100',
    initials: 'GG'
  },
  {
    name: 'Jinja Coffee Exporters',
    location: 'Jinja',
    crops: ['Coffee'],
    avatar: 'https://placehold.co/100x100',
    initials: 'JC'
  },
  {
    name: 'Mbarara Fresh Produce',
    location: 'Mbarara',
    crops: ['Matooke', 'Sweet Potatoes', 'Cassava'],
    avatar: 'https://placehold.co/100x100',
    initials: 'MF'
  },
  {
    name: 'Eastern Agribusiness Co-op',
    location: 'Mbale',
    crops: ['Coffee', 'Maize'],
    avatar: 'https://placehold.co/100x100',
    initials: 'EA'
  },
    {
    name: 'Western Farmers Link',
    location: 'Fort Portal',
    crops: ['Tea', 'Potatoes'],
    avatar: 'https://placehold.co/100x100',
    initials: 'WF'
  },
];

export default function BuyersPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Connect with Buyers</h1>
        <p className="text-muted-foreground">Find local aggregators, exporters, and processors for your produce.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search buyers by name or location..." className="pl-10" />
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {buyers.map((buyer) => (
          <Card key={buyer.name}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={buyer.avatar} alt={buyer.name} data-ai-hint="company logo" />
                  <AvatarFallback className="text-xl font-bold">{buyer.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline">{buyer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{buyer.location}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold mb-2">Looking for:</p>
              <div className="flex flex-wrap gap-2">
                {buyer.crops.map((crop) => (
                  <Badge key={crop} variant="secondary">{crop}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="mr-2 h-4 w-4" />
                Negotiate
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
