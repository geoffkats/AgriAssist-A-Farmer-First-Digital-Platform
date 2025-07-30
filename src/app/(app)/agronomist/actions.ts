
'use server';

import { identifyPestDisease, type IdentifyPestDiseaseInput } from '@/ai/flows/identify-pest-disease';

export async function identifyAction(input: IdentifyPestDiseaseInput) {
  return await identifyPestDisease(input);
}
