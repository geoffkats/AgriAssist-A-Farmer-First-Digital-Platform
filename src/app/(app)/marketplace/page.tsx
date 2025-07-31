
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingCart, CheckCircle, Star, Leaf, Plus, Upload } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProStatus } from '@/context/pro-status-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


const PlantPlaceholder = ({className}: {className?: string}) => (
    <div className={cn("w-full h-full bg-secondary flex items-center justify-center", className)}>
        <Leaf className="w-16 h-16 text-muted-foreground" />
    </div>
);

const products = [
  { name: 'Certified Maize Seeds (Longe 5)', category: 'Seeds', price: 15000, rating: 4.8, image: null, hint: 'maize seeds' },
  { name: 'NPK 17-17-17 Fertilizer', category: 'Fertilizers', price: 180000, rating: 4.5, image: null, hint: 'fertilizer bag', originalPrice: 200000, discount: '10%' },
  { name: 'Organic Pesticide (Neem Oil)', category: 'Agrochemicals', price: 45000, rating: 4.2, image: null, hint: 'pesticide bottle' },
  { name: 'Bean Seeds (NABE 15)', category: 'Seeds', price: 12000, rating: 4.7, image: null, hint: 'bean seeds' },
  { name: 'Urea Fertilizer', category: 'Fertilizers', price: 150000, rating: 4.4, image: null, hint: 'fertilizer sack' },
  { name: 'Fungicide (Mancozeb)', category: 'Agrochemicals', price: 35000, rating: 4.1, image: null, hint: 'fungicide powder', originalPrice: 40000, discount: '12.5%' },
  { name: 'Coffee Seedlings (Robusta)', category: 'Seeds', price: 500, rating: 4.9, image: null, hint: 'coffee seedling' },
  { name: 'Foliar Fertilizer', category: 'Fertilizers', price: 60000, rating: 4.6, image: null, hint: 'fertilizer liquid' },
];

const farmerProduce = [
    { name: 'Fresh Maize (100kg)', farmer: 'John Mubiru', price: 110000, location: 'Mityana', image: null, hint: 'fresh maize' },
    { name: 'Robusta Coffee Beans (Grade A)', farmer: 'Aisha Nakato', price: 8500, unit: '/kg', location: 'Masaka', image: null, hint: 'coffee beans' },
];

export default function MarketplacePage() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isPro } = useProStatus();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);


  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
        title: "Added to Cart",
        description: `${product.name} has been successfully added.`,
        action: <CheckCircle className="text-green-500" />
    })
  }

  return (
    <>
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Marketplace</h1>
        <p className="text-muted-foreground">Buy certified inputs or sell your produce directly to buyers.</p>
      </header>

      <Tabs defaultValue="inputs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TabsList>
                <TabsTrigger value="inputs">Buy Farm Inputs</TabsTrigger>
                <TabsTrigger value="produce">Sell Your Produce</TabsTrigger>
            </TabsList>
             <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for products..." className="pl-10" />
                </div>
                <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="seeds">Seeds</SelectItem>
                    <SelectItem value="fertilizers">Fertilizers</SelectItem>
                    <SelectItem value="agrochemicals">Agrochemicals</SelectItem>
                </SelectContent>
                </Select>
            </div>
        </div>

        <TabsContent value="inputs" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                <Card key={product.name} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative aspect-square">
                        <PlantPlaceholder className="group-hover:scale-110 transition-transform duration-500 ease-in-out"/>
                        <Badge variant="secondary" className="absolute top-3 left-3">{product.category}</Badge>
                         {product.discount && <Badge variant="destructive" className="absolute top-3 right-3">{product.discount} OFF</Badge>}
                    </div>
                    <CardContent className="pt-4 flex-grow flex flex-col">
                    <h3 className="font-semibold font-headline text-lg flex-grow">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-bold text-foreground">{product.rating}</span>
                        </div>
                        <div className="text-right">
                             {product.originalPrice && <p className="text-sm text-muted-foreground line-through">UGX {product.originalPrice.toLocaleString()}</p>}
                            <p className="font-bold text-lg text-primary">UGX {product.price.toLocaleString()}</p>
                        </div>
                    </div>
                    </CardContent>
                    <CardFooter className="p-4">
                    <Button className="w-full" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="produce" className="mt-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Farmer's Produce</CardTitle>
                            <CardDescription>Produce listed directly by farmers. Connect to negotiate.</CardDescription>
                        </div>
                         {isPro && (
                            <Button onClick={() => setIsProductModalOpen(true)}><Plus className="mr-2"/> List Your Produce</Button>
                         )}
                    </div>
                </CardHeader>
                <CardContent>
                    {isPro ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {farmerProduce.map((product) => (
                            <Card key={product.name} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                <div className="relative aspect-square">
                                    <PlantPlaceholder className="group-hover:scale-110 transition-transform duration-500 ease-in-out"/>
                                    <Badge variant="secondary" className="absolute bottom-2 left-2 bg-background/70 backdrop-blur-sm">{product.location}</Badge>
                                </div>
                                <CardContent className="pt-4 flex-grow flex flex-col">
                                <p className="text-xs text-muted-foreground">Listed by {product.farmer}</p>
                                <h3 className="font-semibold font-headline text-lg flex-grow">{product.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-bold text-lg text-primary">UGX {product.price.toLocaleString()}{product.unit}</p>
                                </div>
                                </CardContent>
                                <CardFooter className="p-4">
                                <Button className="w-full" variant="outline">
                                    Contact Farmer
                                </Button>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                    ) : (
                         <div className="text-center p-8 border-dashed border-2 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">List Your Produce and Sell Directly</h3>
                            <p className="mb-4 text-muted-foreground max-w-md mx-auto">This feature is available for Pro subscribers. Upgrade to list your harvest and connect with a network of verified buyers.</p>
                            <Button>
                                <Star className="mr-2 h-4 w-4" />
                                Upgrade to Pro
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>

     <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>List Your Produce</DialogTitle>
                <DialogDescription>
                    Fill out the form below. Your listing will be reviewed by an admin before it goes live.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
                <div className="space-y-2">
                    <Label htmlFor="prod-name">Product Name</Label>
                    <Input id="prod-name" placeholder="e.g., Fresh Maize (100kg bag)" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="prod-category">Category</Label>
                        <Input id="prod-category" placeholder="e.g., Grains" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prod-price">Price (UGX)</Label>
                        <Input id="prod-price" type="number" placeholder="e.g., 120000" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="prod-desc">Description</Label>
                    <Textarea id="prod-desc" placeholder="Add details about your produce, like grade, harvest date, location, etc." />
                </div>
                <div className="space-y-2">
                     <Label>Product Photo</Label>
                    <div className="p-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground"/>
                        <p className="mt-2 text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsProductModalOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={() => {
                    setIsProductModalOpen(false);
                    toast({title: "Product Submitted!", description: "Your produce has been submitted for review."});
                }}>Submit for Review</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
