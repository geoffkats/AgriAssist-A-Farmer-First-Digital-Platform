import PestIdentifier from '@/components/pest-identifier';
import { identifyPestDisease, type IdentifyPestDiseaseInput } from '@/ai/flows/identify-pest-disease';

export default function AgronomistPage() {
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
        <PestIdentifier identifyAction={identifyAction} />
      </div>
    </div>
  );
}
