
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingCart, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const products = [
  { name: 'Certified Maize Seeds (Longe 5)', category: 'seeds', price: '15,000 UGX/kg', rating: 4.8, image: 'https://placehold.co/400x300', hint: 'maize seeds' },
  { name: 'NPK 17-17-17 Fertilizer', category: 'fertilizers', price: '180,000 UGX/bag', rating: 4.5, image: 'https://placehold.co/400x300', hint: 'fertilizer bag' },
  { name: 'Organic Pesticide (Neem Oil)', category: 'agrochemicals', price: '45,000 UGX/L', rating: 4.2, image: 'https://placehold.co/400x300', hint: 'pesticide bottle' },
  { name: 'Bean Seeds (NABE 15)', category: 'seeds', price: '12,000 UGX/kg', rating: 4.7, image: 'https://placehold.co/400x300', hint: 'bean seeds' },
  { name: 'Urea Fertilizer', category: 'fertilizers', price: '150,000 UGX/bag', rating: 4.4, image: 'https://placehold.co/400x300', hint: 'fertilizer sack' },
  { name: 'Fungicide (Mancozeb)', category: 'agrochemicals', price: '35,000 UGX/kg', rating: 4.1, image: 'https://placehold.co/400x300', hint: 'fungicide powder' },
  { name: 'Coffee Seedlings (Robusta)', category: 'seeds', price: '500 UGX/seedling', rating: 4.9, image: 'https://placehold.co/400x300', hint: 'coffee seedling' },
  { name: 'Foliar Fertilizer', category: 'fertilizers', price: '60,000 UGX/L', rating: 4.6, image: 'https://placehold.co/400x300', hint: 'fertilizer liquid' },
];

export default function MarketplacePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
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
          <Card key={product.name} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <Image src={product.image} alt={product.name} width={400} height={300} className="object-cover w-full h-48" data-ai-hint={product.hint} />
            </CardHeader>
            <CardContent className="pt-4 flex-grow">
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground">⭐ {product.rating}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <p className="font-bold text-lg">{product.price}</p>
              <Button onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><CheckCircle className="text-green-500"/> Item Added to Cart</DialogTitle>
            <DialogDescription>
              Successfully added <span className="font-semibold">{selectedProduct?.name}</span> to your shopping cart.
            </DialogDescription>
          </DialogHeader>
           <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Continue Shopping</Button>
            <Button onClick={() => setIsModalOpen(false)}>Go to Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
