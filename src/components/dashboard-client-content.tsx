
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, LineChart, ShoppingBasket, Users, Leaf, Video, CheckCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

const featureCards = [
  {
    title: "Price Trends",
    description: "Analyze market prices and AI-powered predictions to sell smarter.",
    href: "/prices",
    icon: LineChart,
    cta: "View Prices"
  },
  {
    title: "Marketplace",
    description: "Purchase certified seeds, fertilizers, and other inputs.",
    href: "/marketplace",
    icon: ShoppingBasket,
    cta: "Shop Now"
  },
  {
    title: "AI Agronomist",
    description: "Get instant pest & disease diagnosis by uploading a photo.",
    href: "/agronomist",
    icon: Bot,
    cta: "Ask Synth"
  },
  {
    title: "Buyer Network",
    description: "Connect directly with local aggregators and exporters.",
    href: "/buyers",
    icon: Users,
    cta: "Find Buyers"
  }
];

const PlantPlaceholderIcon = () => (
    <div className="w-16 h-16 bg-secondary flex items-center justify-center rounded-md shrink-0">
        <Leaf className="w-8 h-8 text-muted-foreground" />
    </div>
);

const marketplaceItems = [
    { name: 'Drought-Resistant Maize Seeds', price: 'UGX 15,000/kg', image: null, hint: 'maize seeds', description: 'High-yield, drought-resistant maize seeds suitable for all regions of Uganda. Matures in 90-120 days.' },
    { name: 'NPK 17-17-17 Fertilizer', price: 'UGX 180,000/bag', image: null, hint: 'fertilizer bag', description: 'A 50kg bag of balanced NPK fertilizer for promoting healthy plant growth and maximizing yield.' },
    { name: 'Organic Pesticide', price: 'UGX 45,000/L', image: null, hint: 'pesticide bottle', description: '1-liter bottle of neem oil-based organic pesticide, effective against a wide range of common pests.' },
];

const agronomyGuides = [
    { title: 'Identifying Fall Armyworm', type: 'Video', icon: Video, href: "/guides" },
    { title: 'Proper Fertilizer Application for Beans', type: 'Guide', icon: Leaf, href: "/guides" },
    { title: 'Post-Harvest Handling for Coffee', type: 'Video', icon: Video, href: "/guides" },
]

type User = {
    name: string;
};

type DashboardClientContentProps = {
    user: User | null;
}

export default function DashboardClientContent({ user }: DashboardClientContentProps) {
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const { addToCart } = useCart();
    const { toast } = useToast();

    const openProductModal = (product: any) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleAddToCart = (product: any) => {
        addToCart(product);
        setIsProductModalOpen(false);
        toast({
            title: "Added to Cart",
            description: `${product.name} has been successfully added to your cart.`,
        });
    }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {user?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your farm's overview. Let's make today productive.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                    <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
              <CardDescription className="pt-2">{feature.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={feature.href}>{feature.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Marketplace Spotlight</CardTitle>
                <CardDescription>Featured products to boost your yield.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
               {marketplaceItems.map(item => (
                 <div key={item.name} className="flex items-center gap-4">
                    <PlantPlaceholderIcon />
                    <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => openProductModal(item)}>View</Button>
                 </div>
               ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Agronomy Guides</CardTitle>
                <CardDescription>Quick tips and video tutorials to help you succeed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {agronomyGuides.map(guide => (
                   <Link href={guide.href} key={guide.title} className="flex items-center gap-4 p-2 rounded-md hover:bg-secondary transition-colors">
                        <div className={`p-2 rounded-full bg-primary/10`}>
                           <guide.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{guide.title}</p>
                        </div>
                        <Badge variant={guide.type === 'Video' ? 'destructive' : 'secondary'}>{guide.type}</Badge>
                    </Link>
                ))}
            </CardContent>
        </Card>
      </div>

       <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>
                {selectedProduct?.price}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="w-full h-48 bg-secondary flex items-center justify-center rounded-md">
              <Leaf className="w-16 h-16 text-muted-foreground" />
            </div>
             <p className="text-muted-foreground">{selectedProduct?.description}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductModalOpen(false)}>Close</Button>
            <Button onClick={() => handleAddToCart(selectedProduct)}>
                <ShoppingCart className="mr-2" />
                Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
