
'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, ArrowUp, ArrowDown, Star, Coins, BellRing } from 'lucide-react';
import PricePredictor from '@/components/price-predictor';
import { useProStatus } from '@/context/pro-status-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { predictAction } from './actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BuyCreditsDialog } from '@/components/buy-credits-dialog';

const commodityPrices = [
  { name: 'Maize', price: 1250, unit: 'UGX/kg', change: 2.5, trend: 'up' },
  { name: 'Beans', price: 3400, unit: 'UGX/kg', change: -1.2, trend: 'down' },
  { name: 'Coffee (Robusta)', price: 7800, unit: 'UGX/kg', change: 5.8, trend: 'up' },
  { name: 'Matooke', price: 25000, unit: 'per bunch', change: 0, trend: 'stable' },
  { name: 'Cassava', price: 800, unit: 'UGX/kg', change: 1.0, trend: 'up' },
  { name: 'Sweet Potatoes', price: 950, unit: 'UGX/kg', change: -0.5, trend: 'down' },
];

export default function PricesPage() {
  const { isPro, aiCredits, consumeCredit } = useProStatus();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState<any>(null);
  const [isBuyCreditsOpen, setIsBuyCreditsOpen] = useState(false);


  const openAlertModal = (commodity: any) => {
    setSelectedCommodity(commodity);
    setIsAlertModalOpen(true);
  };

  return (
    <>
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
                      <Button variant="ghost" size="icon" onClick={() => openAlertModal(item)}>
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
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Unlock AI Price Forecasts</CardTitle>
                 <CardDescription>
                  You have <span className="font-bold text-primary">{aiCredits} AI credits</span> remaining.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {aiCredits > 0 ? (
                  <PricePredictor predictAction={async (input) => {
                    const result = await predictAction(input);
                    consumeCredit();
                    return result;
                  }} />
                ) : (
                   <div className="text-center p-4 border-dashed border-2 rounded-lg h-full flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-2">You've run out of AI credits</h3>
                    <p className="mb-4 text-muted-foreground">Choose an option to continue using AI forecasts.</p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Button asChild>
                          <Link href="/pricing">
                          <Star className="mr-2 h-4 w-4" />
                          Upgrade to Pro
                          </Link>
                      </Button>
                       <Button variant="outline" onClick={() => setIsBuyCreditsOpen(true)}>
                          <Coins className="mr-2 h-4 w-4" />
                          Purchase Credits
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
       <Dialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Price Alert</DialogTitle>
            <DialogDescription>
              This is a simulation. In a real app, you would be notified when the price of {selectedCommodity?.name} changes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAlertModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAlertModalOpen(false)}>
              <BellRing className="mr-2" />
              Confirm Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <BuyCreditsDialog open={isBuyCreditsOpen} onOpenChange={setIsBuyCreditsOpen} />
    </>
  );
}
