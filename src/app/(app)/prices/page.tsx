
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, ArrowUp, ArrowDown, Star } from 'lucide-react';
import PricePredictor from '@/components/price-predictor';
import { useProStatus } from '@/context/pro-status-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { predictAction } from './actions';

const commodityPrices = [
  { name: 'Maize', price: 1250, unit: 'UGX/kg', change: 2.5, trend: 'up' },
  { name: 'Beans', price: 3400, unit: 'UGX/kg', change: -1.2, trend: 'down' },
  { name: 'Coffee (Robusta)', price: 7800, unit: 'UGX/kg', change: 5.8, trend: 'up' },
  { name: 'Matooke', price: 25000, unit: 'per bunch', change: 0, trend: 'stable' },
  { name: 'Cassava', price: 800, unit: 'UGX/kg', change: 1.0, trend: 'up' },
  { name: 'Sweet Potatoes', price: 950, unit: 'UGX/kg', change: -0.5, trend: 'down' },
];

export default function PricesPage() {
  const { isPro } = useProStatus();

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Market Prices</h1>
        <p className="text-muted-foreground">Live prices from major trading centers and AI-powered trend analysis.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commodityPrices.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right font-semibold">{new Intl.NumberFormat().format(item.price)} <span className="text-xs text-muted-foreground">{item.unit}</span></TableCell>
                    <TableCell className="text-right">
                      <Badge variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'} className="bg-opacity-20 text-current">
                        {item.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : item.trend === 'down' ? <ArrowDown className="h-3 w-3 mr-1" /> : null}
                        {item.change}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Set price alert for {item.name}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
           </div>
        </div>
        <div className="lg:col-span-1">
          {isPro ? (
            <PricePredictor predictAction={predictAction} />
          ) : (
            <Card className="h-full flex flex-col items-center justify-center text-center">
              <CardHeader>
                <CardTitle>Unlock AI Price Forecasts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">Upgrade to Pro to get AI-powered price predictions and sell smarter.</p>
                <Button asChild>
                  <Link href="/pricing">
                    <Star className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
