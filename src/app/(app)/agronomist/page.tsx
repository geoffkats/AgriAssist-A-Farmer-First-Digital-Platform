
'use client';

import PestIdentifier from '@/components/pest-identifier';
import { identifyPestDisease, type IdentifyPestDiseaseInput } from '@/ai/flows/identify-pest-disease';
import { useProStatus } from '@/context/pro-status-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function AgronomistPage() {
  const { isPro } = useProStatus();

  async function identifyAction(input: IdentifyPestDiseaseInput) {
    'use server';
    return await identifyPestDisease(input);
  }
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
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Unlock the AI Agronomist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">This feature is available to Pro subscribers. Upgrade to get instant pest and disease diagnosis.</p>
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
  );
}
