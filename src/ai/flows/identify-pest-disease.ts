'use server';

/**
 * @fileOverview This file defines a Genkit flow for identifying plant pests and diseases using an AI agronomist.
 *
 * - identifyPestDisease - A function that takes a photo of a plant and returns a diagnosis of potential pests or diseases.
 * - IdentifyPestDiseaseInput - The input type for the identifyPestDisease function.
 * - IdentifyPestDiseaseOutput - The return type for the identifyPestDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyPestDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  additionalDetails: z.string().optional().describe('Any additional details about the plant or symptoms.'),
});
export type IdentifyPestDiseaseInput = z.infer<typeof IdentifyPestDiseaseInputSchema>;

const IdentifyPestDiseaseOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of potential pests or diseases.'),
  confidence: z.number().describe('The confidence level of the diagnosis (0-1).'),
  recommendations: z.string().describe('Recommendations for treatment or further action.'),
});
export type IdentifyPestDiseaseOutput = z.infer<typeof IdentifyPestDiseaseOutputSchema>;

export async function identifyPestDisease(input: IdentifyPestDiseaseInput): Promise<IdentifyPestDiseaseOutput> {
  return identifyPestDiseaseFlow(input);
}

const identifyPestDiseasePrompt = ai.definePrompt({
  name: 'identifyPestDiseasePrompt',
  input: {schema: IdentifyPestDiseaseInputSchema},
  output: {schema: IdentifyPestDiseaseOutputSchema},
  prompt: `You are an expert AI agronomist specializing in identifying plant pests and diseases from images.

You will analyze the provided image and any additional details to diagnose potential issues.

Based on your analysis, provide a diagnosis, a confidence level (0-1), and recommendations for treatment or further action.

Image: {{media url=photoDataUri}}
Additional Details: {{{additionalDetails}}}

Ensure your diagnosis and recommendations are clear, concise, and actionable for a farmer.
`,
});

const identifyPestDiseaseFlow = ai.defineFlow(
  {
    name: 'identifyPestDiseaseFlow',
    inputSchema: IdentifyPestDiseaseInputSchema,
    outputSchema: IdentifyPestDiseaseOutputSchema,
  },
  async input => {
    const {output} = await identifyPestDiseasePrompt(input);
    return output!;
  }
);
