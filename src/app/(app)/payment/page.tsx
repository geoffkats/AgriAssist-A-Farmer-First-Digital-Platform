'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useProStatus } from '@/context/pro-status-context';
import { Loader2, CreditCard } from 'lucide-react';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { upgradeToPro } = useProStatus();

  const handlePayment = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      upgradeToPro();
      setLoading(false);
      toast({
        title: 'Payment Successful!',
        description: 'Welcome to AgriAssist Pro. All features are now unlocked.',
      });
      router.push('/');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[60vh]">
      <header className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold font-headline">Upgrade to Pro</h1>
        <p className="text-muted-foreground mt-2">
          You're one step away from unlocking powerful AI features to boost your farm's productivity and profitability.
        </p>
      </header>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>You are subscribing to the AgriAssist Pro plan for UGX 5,000/month.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Payment simulation. No real payment will be processed.</p>
            </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handlePayment} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Processing Payment...' : 'Pay UGX 5,000 Now'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
