
'use client';

import { useState, useEffect } from 'react';
import { useProStatus } from '@/context/pro-status-context';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Coins, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const creditPacks = [
  { credits: 20, price: 2000, price_display: 'UGX 2,000' },
  { credits: 50, price: 4000, price_display: 'UGX 4,000', popular: true },
  { credits: 100, price: 7000, price_display: 'UGX 7,000' },
];

type BuyCreditsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPack?: any;
};

export function BuyCreditsDialog({ open, onOpenChange, selectedPack: initialSelectedPack }: BuyCreditsDialogProps) {
  const [selectedPack, setSelectedPack] = useState(initialSelectedPack || creditPacks[1]);
  const [loading, setLoading] = useState(false);
  const { addCredits } = useProStatus();
  const { toast } = useToast();

  useEffect(() => {
    if(initialSelectedPack) {
      setSelectedPack(initialSelectedPack);
    }
  }, [initialSelectedPack])

  const handlePurchase = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      addCredits(selectedPack.credits);
      toast({
        title: 'Purchase Successful!',
        description: `You've added ${selectedPack.credits} AI credits to your account.`,
      });
      setLoading(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase AI Credits</DialogTitle>
          <DialogDescription>
            Top up your AI credits to continue using premium AI features without a Pro subscription.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm font-semibold">Select a Credit Pack:</p>
          <div className="grid grid-cols-3 gap-4">
            {creditPacks.map((pack) => (
              <Card
                key={pack.credits}
                onClick={() => setSelectedPack(pack)}
                className={cn(
                  'cursor-pointer text-center relative transition-all',
                  selectedPack.credits === pack.credits ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                )}
              >
                {pack.popular && (
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">POPULAR</div>
                )}
                <CardContent className="p-4">
                  <p className="text-2xl font-bold">{pack.credits}</p>
                  <p className="text-sm text-muted-foreground">Credits</p>
                  <p className="text-sm font-semibold mt-2">{pack.price_display}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Coins className="mr-2 h-4 w-4" />
            )}
            {loading ? 'Processing...' : `Buy for ${selectedPack.price_display}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
