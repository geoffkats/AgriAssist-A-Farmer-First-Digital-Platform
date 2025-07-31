
'use client';

import { useState } from 'react';
import { Check, Star, Coins, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { BuyCreditsDialog } from '@/components/buy-credits-dialog';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';

const freeFeatures = [
  'Daily market price listings',
  'Browse and order farm inputs',
  'Access to community forums',
  'Basic knowledge guides',
  'View wallet balance & history',
  '15 AI Credits per month',
];

const proFeatures = [
  'All Free features, plus:',
  '200 AI Credits per month',
  'Advanced credit & loan access',
  'Personalized analytics dashboards',
  'Automated financial reporting',
  'Premium agronomy guides',
];

const buyerFeatures = [
    'All Pro features, plus:',
    'Post buy offers to farmer network',
    'Access farmer & co-op analytics',
    'Directly message co-operatives',
    'Priority support',
]

const creditPacks = [
  { credits: 20, price: 'UGX 2,000', price_numeric: 2000 },
  { credits: 50, price: 'UGX 4,000', price_numeric: 4000, popular: true },
  { credits: 100, price: 'UGX 7,000', price_numeric: 7000 },
];

export default function PricingPage() {
  const [isBuyCreditsOpen, setIsBuyCreditsOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(creditPacks[1]);
  const { user } = useAuth();
  const isPro = user?.isPro && user.role !== 'buyer';
  const isBuyer = user?.role === 'buyer';


  const openPurchaseModal = (pack: any) => {
    setSelectedPack(pack);
    setIsBuyCreditsOpen(true);
  }

  return (
    <>
    <div className="flex flex-col gap-8">
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-headline">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Whether you're a farmer or a buyer, we have a plan for you.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto w-full mt-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Free Farmer</CardTitle>
            <CardDescription>Essential tools for every farmer to get started and grow.</CardDescription>
            <div className="pt-4">
              <span className="text-4xl font-bold">UGX 0</span>
              <span className="text-muted-foreground">/ month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <p className="font-semibold">Core Features:</p>
            <ul className="space-y-3">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {(!user || (!isPro && !isBuyer)) ? (
                <Button variant="secondary" className="w-full" disabled>
                    Your Current Plan
                </Button>
            ) : (
                 <Button variant="outline" className="w-full" disabled>
                    Downgrade
                </Button>
            )}
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary ring-2 ring-primary relative">
           <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
          <CardHeader>
            <CardTitle className="font-headline text-primary flex items-center gap-2">
              <Star className="h-6 w-6" />
              Pro Farmer
            </CardTitle>
            <CardDescription>Advanced AI-powered tools for the entrepreneurial farmer.</CardDescription>
            <div className="pt-4">
              <span className="text-4xl font-bold">UGX 25,000</span>
              <span className="text-muted-foreground">/ month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
             <p className="font-semibold">Everything in Free, plus:</p>
            <ul className="space-y-3">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {isPro ? (
                <Button variant="secondary" className="w-full" disabled>
                    Your Current Plan
                </Button>
            ) : (
                <Button asChild className="w-full" disabled={isBuyer}>
                    <Link href="/payment">Upgrade to Pro</Link>
                </Button>
            )}
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Building className="h-6 w-6" />
              Buyer Tier
            </CardTitle>
            <CardDescription>Source produce, manage co-ops, and connect with farmers.</CardDescription>
            <div className="pt-4">
              <span className="text-4xl font-bold">UGX 50,000</span>
              <span className="text-muted-foreground">/ month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
             <p className="font-semibold">Everything in Pro, plus:</p>
            <ul className="space-y-3">
              {buyerFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {isBuyer ? (
                 <Button variant="secondary" className="w-full" disabled>
                    Your Current Plan
                </Button>
            ) : (
                 <Button asChild className="w-full">
                    <Link href="/payment-buyer">Upgrade to Buyer</Link>
                </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="max-w-5xl mx-auto w-full mt-8">
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="font-headline">Or, Top Up Your AI Credits</CardTitle>
                <CardDescription>Not ready for a subscription? Buy credits for one-time access to AI features.</CardDescription>
            </CardHeader>
             <CardContent className="grid sm:grid-cols-3 gap-4">
                {creditPacks.map((pack) => (
                    <Card 
                        key={pack.credits} 
                        className={cn("relative cursor-pointer hover:border-primary transition-colors", pack.popular && "border-primary")}
                        onClick={() => openPurchaseModal(pack)}
                    >
                        {pack.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Popular</Badge>}
                        <CardContent className="p-6 text-center">
                            <p className="text-4xl font-bold flex items-center justify-center gap-2">
                                <Coins className="text-primary"/> {pack.credits}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">AI Credits</p>
                            <p className="text-lg font-semibold mt-4">{pack.price}</p>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
            <CardFooter className="justify-center">
                <Button onClick={() => openPurchaseModal(creditPacks[1])}>
                    <Coins className="mr-2"/>
                    Purchase Credits
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
    <BuyCreditsDialog open={isBuyCreditsOpen} onOpenChange={setIsBuyCreditsOpen} selectedPack={selectedPack} />
    </>
  );
}
