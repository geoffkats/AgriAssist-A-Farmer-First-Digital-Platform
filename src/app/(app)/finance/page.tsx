
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Landmark, Plus, Receipt, Star, Wallet, CheckCircle } from 'lucide-react';
import { useProStatus } from '@/context/pro-status-context';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const transactions = [
    { type: 'Market Sale', amount: 450000, date: '2024-07-20', direction: 'in' },
    { type: 'Seed Purchase', amount: -120000, date: '2024-07-18', direction: 'out' },
    { type: 'Loan Disbursment', amount: 1000000, date: '2024-07-15', direction: 'in' },
    { type: 'Fertilizer', amount: -180000, date: '2024-07-14', direction: 'out' },
];

export default function FinancePage() {
  const { isPro } = useProStatus();
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const { toast } = useToast();

  const handleAddMoney = () => {
    setIsAddMoneyModalOpen(false);
    toast({
        title: "Success!",
        description: "UGX 50,000 has been added to your wallet. This is a simulation.",
    });
  }
  
  const handleApplyLoan = () => {
    setIsLoanModalOpen(false);
    toast({
        title: "Application Submitted",
        description: "Your loan application has been received and is under review. This is a simulation.",
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Finance Hub</h1>
        <p className="text-muted-foreground">Manage your wallet, access credit, and secure insurance.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2 font-headline"><Wallet /> My Wallet</CardTitle>
                    <CardDescription>MTN Mobile Money</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsAddMoneyModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Money
                </Button>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-4xl font-bold">UGX 1,250,000</p>
            </CardContent>
        </Card>
        {isPro ? (
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline">Agri-Credit</CardTitle>
                    <CardDescription>Get a loan for your farm inputs.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">Available Limit</p>
                    <p className="text-2xl font-bold">UGX 2,000,000</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => setIsLoanModalOpen(true)}>
                        <Landmark className="mr-2 h-4 w-4" />
                        Apply for Loan
                    </Button>
                </CardFooter>
            </Card>
        ) : (
            <Card className="flex flex-col items-center justify-center text-center">
                <CardHeader>
                    <CardTitle className="font-headline">Unlock Agri-Credit</CardTitle>
                    <CardDescription>Upgrade to Pro to apply for loans.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center">
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
      
       <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${tx.direction === 'in' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                    {tx.direction === 'in' ? <ArrowDownLeft className="h-5 w-5 text-green-500" /> : <ArrowUpRight className="h-5 w-5 text-red-500" />}
                  </div>
                  <div>
                    <p className="font-semibold">{tx.type}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                    <p className={`font-bold ${tx.direction === 'in' ? 'text-green-600' : 'text-destructive'}`}>
                        {tx.direction === 'out' ? '-' : ''}UGX {Math.abs(tx.amount).toLocaleString()}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
            <Button variant="outline">
                <Receipt className="mr-2 h-4 w-4" />
                View Full Statement
            </Button>
        </CardFooter>
      </Card>
      
      {/* Add Money Modal */}
      <Dialog open={isAddMoneyModalOpen} onOpenChange={setIsAddMoneyModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Money to Wallet</DialogTitle>
                <DialogDescription>
                  Enter the amount and confirm to top-up your wallet. This is a simulation.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="amount">Amount (UGX)</Label>
                    <Input id="amount" type="number" placeholder="e.g., 50000" defaultValue="50000"/>
                </div>
                 <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <p className="text-sm font-semibold p-3 border rounded-md">MTN Mobile Money: ***-***-**25</p>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddMoneyModalOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMoney}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm & Add UGX 50,000
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Apply for Loan Modal */}
       <Dialog open={isLoanModalOpen} onOpenChange={setIsLoanModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Apply for Agri-Credit</DialogTitle>
                <DialogDescription>
                  Fill in the details below to apply for a loan. Your application will be reviewed by our team.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="loan-amount">Loan Amount (UGX)</Label>
                    <Input id="loan-amount" type="number" placeholder="e.g., 500000" defaultValue="500000"/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="loan-purpose">Loan Purpose</Label>
                    <Input id="loan-purpose" placeholder="e.g., Purchase of certified maize seeds"/>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsLoanModalOpen(false)}>Cancel</Button>
                <Button onClick={handleApplyLoan}>
                    <Landmark className="mr-2 h-4 w-4" />
                    Submit Application
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
