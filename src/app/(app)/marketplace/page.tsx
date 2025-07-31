
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingCart, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

const products = [
  { name: 'Certified Maize Seeds (Longe 5)', category: 'Seeds', price: '15,000 UGX/kg', rating: 4.8, image: 'https://placehold.co/400x300', hint: 'maize seeds' },
  { name: 'NPK 17-17-17 Fertilizer', category: 'Fertilizers', price: '180,000 UGX/bag', rating: 4.5, image: 'https://placehold.co/400x300', hint: 'fertilizer bag' },
  { name: 'Organic Pesticide (Neem Oil)', category: 'Agrochemicals', price: '45,000 UGX/L', rating: 4.2, image: 'https://placehold.co/400x300', hint: 'pesticide bottle' },
  { name: 'Bean Seeds (NABE 15)', category: 'Seeds', price: '12,000 UGX/kg', rating: 4.7, image: 'https://placehold.co/400x300', hint: 'bean seeds' },
  { name: 'Urea Fertilizer', category: 'Fertilizers', price: '150,000 UGX/bag', rating: 4.4, image: 'https://placehold.co/400x300', hint: 'fertilizer sack' },
  { name: 'Fungicide (Mancozeb)', category: 'Agrochemicals', price: '35,000 UGX/kg', rating: 4.1, image: 'https://placehold.co/400x300', hint: 'fungicide powder' },
  { name: 'Coffee Seedlings (Robusta)', category: 'Seeds', price: '500 UGX/seedling', rating: 4.9, image: 'https://placehold.co/400x300', hint: 'coffee seedling' },
  { name: 'Foliar Fertilizer', category: 'Fertilizers', price: '60,000 UGX/L', rating: 4.6, image: 'https://placehold.co/400x300', hint: 'fertilizer liquid' },
];

export default function MarketplacePage() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
        title: "Added to Cart",
        description: `${product.name} has been successfully added.`,
        action: <CheckCircle className="text-green-500" />
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Input Marketplace</h1>
        <p className="text-muted-foreground">Certified seeds, fertilizers, and more from vetted suppliers.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for products..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.name} className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
                <Image src={product.image} alt={product.name} width={400} height={300} className="object-cover w-full h-48" data-ai-hint={product.hint} />
                <Badge variant="secondary" className="absolute top-3 left-3">{product.category}</Badge>
            </div>
            <CardContent className="pt-4 flex-grow flex flex-col">
              <h3 className="font-semibold font-headline text-lg flex-grow">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                 <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-foreground">{product.rating}</span>
                 </div>
                 <p className="font-bold text-lg text-primary">{product.price}</p>
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
    </div>
  );
}
