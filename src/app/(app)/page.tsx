
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, LineChart, ShoppingBasket, Users, Leaf, Video } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';

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

const marketplaceItems = [
    { name: 'Drought-Resistant Maize Seeds', price: 'UGX 15,000/kg', image: 'https://placehold.co/300x200', hint: 'maize seeds' },
    { name: 'NPK 17-17-17 Fertilizer', price: 'UGX 180,000/bag', image: 'https://placehold.co/300x200', hint: 'fertilizer bag' },
    { name: 'Organic Pesticide', price: 'UGX 45,000/L', image: 'https://placehold.co/300x200', hint: 'pesticide bottle' },
];

const agronomyGuides = [
    { title: 'Identifying Fall Armyworm', type: 'Video', icon: Video },
    { title: 'Proper Fertilizer Application for Beans', type: 'Guide', icon: Leaf },
    { title: 'Post-Harvest Handling for Coffee', type: 'Video', icon: Video },
]

export default function DashboardPage() {
  const { user } = useAuth();
  
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
                <CardTitle className="font-headline">{feature.title}</CardTitle>
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
                    <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.hint} />
                    <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
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
                    <div key={guide.title} className="flex items-center gap-4 p-2 rounded-md hover:bg-secondary transition-colors cursor-pointer">
                        <div className={`p-2 rounded-full bg-primary/10`}>
                           <guide.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{guide.title}</p>
                        </div>
                        <Badge variant={guide.type === 'Video' ? 'destructive' : 'secondary'}>{guide.type}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
