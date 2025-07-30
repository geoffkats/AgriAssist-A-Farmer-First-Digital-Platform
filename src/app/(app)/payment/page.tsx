
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useProStatus } from '@/context/pro-status-context';
import { Loader2, CreditCard, Camera, Smartphone, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function GPayIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M20.4,9.6H20v-0.5c0-2.4-1.9-4.4-4.4-4.4H8.4C5.9,4.7,4,6.6,4,9.1v0.5H3.6C2.7,9.6,2,10.3,2,11.2v5.6 c0,0.9,0.7,1.6,1.6,1.6h0.4v0.5c0,2.4,1.9,4.4,4.4,4.4h7.2c2.4,0,4.4-1.9,4.4-4.4v-0.5h0.4c0.9,0,1.6-0.7,1.6-1.6v-5.6 C22,10.3,21.3,9.6,20.4,9.6z M5.5,9.1c0-1.6,1.3-2.9,2.9-2.9h7.2c1.6,0,2.9,1.3,2.9,2.9v4.7H5.5V9.1z M18.5,18.9 c0,1.6-1.3,2.9-2.9,2.9H8.4c-1.6,0-2.9-1.3-2.9-2.9v-0.5h13V18.9z" fill="currentColor" />
            <path d="M12.5,10.9h-4c-0.4,0-0.6,0.3-0.6,0.6v1.1c0,0.4,0.3,0.6,0.6,0.6h4c0.4,0,0.6-0.3,0.6-0.6v-1.1 C13.1,11.2,12.8,10.9,12.5,10.9z" fill="currentColor" />
        </svg>
    )
}

function StripeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M33.3137 23.3137C33.3137 20.658 31.0694 18.4137 28.4137 18.4137C25.758 18.4137 23.5137 20.658 23.5137 23.3137C23.5137 24.008 23.6663 24.6644 23.9392 25.2536H14.7464C14.1573 24.6644 14 24.008 14 23.3137C14 17.1147 19.1147 12 25.3137 12C31.5128 12 36.6274 17.1147 36.6274 23.3137C36.6274 24.008 36.4712 24.6644 36.1982 25.2536H33.5608C33.4045 24.3168 33.3137 23.8219 33.3137 23.3137Z" fill="currentColor"></path>
            <path d="M24.4863 24.7464C24.4863 27.4021 26.7306 29.6464 29.3863 29.6464C32.042 29.6464 34.2863 27.4021 34.2863 24.7464C34.2863 24.0521 34.1337 23.3957 33.8608 22.8065L33.8608 22.8065H43C43.8284 22.8065 44.5 23.4781 44.5 24.3065V24.3065C44.5 30.5056 39.3853 35.6202 33.1863 35.6202C26.9872 35.6202 21.8726 30.5056 21.8726 24.3065C21.8726 23.6121 22.0288 22.9557 22.3018 22.3665L22.3018 22.3665H24.2392C24.4121 23.7332 24.4863 24.2464 24.4863 24.7464Z" fill="currentColor"></path>
        </svg>
    )
}

function CryptoIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 22a10 10 0 1 0-8.45-4.6" />
            <path d="M12 2v4" />
            <path d="m15 4-3 3-3-3" />
            <path d="M12 12v10" />
            <path d="m15 14-3 3-3-3" />
        </svg>
    )
}


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
    <div className="flex flex-col gap-8 items-center justify-center min-h-[calc(100vh-10rem)]">
      <header className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold font-headline">Upgrade to Pro</h1>
        <p className="text-muted-foreground mt-2">
          You're subscribing to the AgriAssist Pro plan for UGX 5,000/month.
        </p>
      </header>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4" />Card</TabsTrigger>
                <TabsTrigger value="mobile"><Smartphone className="mr-2 h-4 w-4" />Mobile</TabsTrigger>
                <TabsTrigger value="other"><Globe className="mr-2 h-4 w-4" />Other</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="flex">
                      <Input id="card-number" placeholder="0000 0000 0000 0000" />
                      <Button variant="outline" className="ml-2">
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Scan Card</span>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="mobile" className="mt-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="07XX XXX XXX" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <Button variant="outline">
                            <img src="https://www.mtn.co.ug/wp-content/themes/mtn-ugo/images/logo.svg" alt="MTN" className="h-6 mr-2"/>
                            MTN MoMo
                         </Button>
                         <Button variant="outline">
                             <img src="https://www.airtel.co.ug/assets/images/Airtel-Logo.png" alt="Airtel" className="h-4 mr-2"/>
                             Airtel Money
                         </Button>
                    </div>
                </div>
              </TabsContent>
              <TabsContent value="other" className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="py-6 text-lg"><StripeIcon className="mr-2 h-6 w-6" /> Stripe</Button>
                    <Button variant="outline" className="py-6 text-lg"><GPayIcon className="mr-2 h-6 w-6" /> Google Pay</Button>
                    <Button variant="outline" className="py-6 text-lg col-span-2"><CryptoIcon className="mr-2 h-6 w-6" /> Pay with Crypto</Button>
                </div>
              </TabsContent>
            </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handlePayment} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Processing Payment...' : 'Pay UGX 5,000 Now'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">This is a payment simulation. No real payment will be processed.</p>
        </CardFooter>
      </Card>
    </div>
  );

    