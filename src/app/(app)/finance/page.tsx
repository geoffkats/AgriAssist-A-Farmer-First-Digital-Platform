import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Landmark, Plus, Receipt } from 'lucide-react';

const transactions = [
    { type: 'Market Sale', amount: 450000, date: '2024-07-20', direction: 'in' },
    { type: 'Seed Purchase', amount: -120000, date: '2024-07-18', direction: 'out' },
    { type: 'Loan Disbursment', amount: 1000000, date: '2024-07-15', direction: 'in' },
    { type: 'Fertilizer', amount: -180000, date: '2024-07-14', direction: 'out' },
];

export default function FinancePage() {
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
                    <CardTitle>My Wallet</CardTitle>
                    <CardDescription>MTN Mobile Money</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Money
                </Button>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-4xl font-bold">UGX 1,250,000</p>
            </CardContent>
        </Card>
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
                <Button className="w-full">
                    <Landmark className="mr-2 h-4 w-4" />
                    Apply for Loan
                </Button>
            </CardFooter>
        </Card>
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between">
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
    </div>
  );
}
