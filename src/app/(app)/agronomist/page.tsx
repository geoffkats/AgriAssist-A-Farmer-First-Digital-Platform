
'use client';

import PestIdentifier from '@/components/pest-identifier';
import { useProStatus } from '@/context/pro-status-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { identifyAction } from './actions';


export default function AgronomistPage() {
  const { isPro, aiCredits, consumeCredit } = useProStatus();

  return (
    <div className="flex flex-col gap-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold font-headline">Ask Synth - Your AI Agronomist</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Struggling with a crop issue? Upload a photo of the affected plant, and our AI will help diagnose pests and diseases.
        </p>
      </header>
      <div className="max-w-4xl mx-auto w-full">
        {isPro ? (
          <PestIdentifier identifyAction={identifyAction} />
        ) : (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>AI Agronomist</CardTitle>
               <CardDescription>
                You have <span className="font-bold text-primary">{aiCredits} AI credits</span> remaining.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {aiCredits > 0 ? (
                 <PestIdentifier identifyAction={async (input) => {
                   const result = await identifyAction(input);
                   consumeCredit();
                   return result;
                 }} />
              ) : (
                 <div className="text-center">
                    <p className="mb-4 text-muted-foreground">You have run out of AI credits. Upgrade to Pro for unlimited AI diagnosis.</p>
                    <Button asChild>
                        <Link href="/pricing">
                        <Star className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                        </Link>
                    </Button>
                 </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
