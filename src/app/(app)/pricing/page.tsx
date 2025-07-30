import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const freeFeatures = [
  'Daily market price listings',
  'Browse and order farm inputs',
  'Access to community forums',
  'Basic knowledge guides',
  'View wallet balance & history',
];

const proFeatures = [
  'AI-powered price trend analysis & alerts',
  'Automated bulk ordering & group buys',
  'Access to micro-loans and crop insurance',
  'AI Agronomist Chatbot (pest identification)',
  'Traceability & quality certification',
  'Advanced co-operative management tools',
];

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-headline">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Unlock the full potential of your farm with our Pro features. Start with our powerful free plan today.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto w-full mt-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Free Tier</CardTitle>
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
            <Button variant="secondary" className="w-full" disabled>
              Your Current Plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary ring-2 ring-primary">
           <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
          <CardHeader>
            <CardTitle className="font-headline text-primary flex items-center gap-2">
              <Star className="h-6 w-6" />
              Pro Tier
            </CardTitle>
            <CardDescription>Advanced AI-powered tools for the commercial and entrepreneurial farmer.</CardDescription>
            <div className="pt-4">
              <span className="text-4xl font-bold">UGX 5,000</span>
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
            <Button asChild className="w-full">
              <Link href="/payment">Upgrade to Pro</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
