
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Phone, Mail, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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
  const [isNegotiateModalOpen, setIsNegotiateModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
  const { toast } = useToast();

  const openNegotiateModal = (buyer: any) => {
    setSelectedBuyer(buyer);
    setIsNegotiateModalOpen(true);
  };

  const openCallModal = (buyer: any) => {
    setSelectedBuyer(buyer);
    setIsCallModalOpen(true);
  };
  
  const handleSendMessage = () => {
    setIsNegotiateModalOpen(false);
    toast({
        title: "Message Sent!",
        description: `Your negotiation request has been sent to ${selectedBuyer?.name}. This is a simulation.`
    })
  }


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
          <Card key={buyer.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={buyer.avatar} alt={buyer.name} data-ai-hint="company logo" />
                  <AvatarFallback className="text-xl font-bold">{buyer.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline text-2xl">{buyer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{buyer.location}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm font-semibold mb-2">Looking for:</p>
              <div className="flex flex-wrap gap-2">
                {buyer.crops.map((crop) => (
                  <Badge key={crop} variant="secondary">{crop}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1" onClick={() => openCallModal(buyer)}>
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => openNegotiateModal(buyer)}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={isNegotiateModalOpen} onOpenChange={setIsNegotiateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send message to {selectedBuyer?.name}</DialogTitle>
            <DialogDescription>
              This will simulate sending an email to start a price negotiation. In a real app, this would be sent to their contact email.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea id="message" placeholder="e.g., Hello, I have 10 tons of high-quality maize available. What is your current offer price?" rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNegotiateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSendMessage}>
              <MessageSquare className="mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isCallModalOpen} onOpenChange={setIsCallModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call {selectedBuyer?.name}</DialogTitle>
            <DialogDescription>
              This is a simulation. In a real app, this would initiate a phone call.
            </DialogDescription>
          </DialogHeader>
           <DialogFooter>
            <Button variant="outline" onClick={() => setIsCallModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsCallModalOpen(false)}>
              <Phone className="mr-2" />
              Confirm Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
