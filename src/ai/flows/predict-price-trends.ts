// src/ai/flows/predict-price-trends.ts
'use server';

/**
 * @fileOverview Predicts price trends for a given commodity using AI.
 *
 * - predictPriceTrends - A function that predicts the price trends for a commodity.
 * - PredictPriceTrendsInput - The input type for the predictPriceTrends function.
 * - PredictPriceTrendsOutput - The output type for the predictPriceTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictPriceTrendsInputSchema = z.object({
  commodity: z.string().describe('The commodity to predict price trends for (e.g., maize, beans, coffee).'),
  location: z.string().describe('The location for which to predict price trends (e.g., Kampala, Nairobi).'),
});

export type PredictPriceTrendsInput = z.infer<typeof PredictPriceTrendsInputSchema>;

const PriceTrendSchema = z.object({
  date: z.string().describe('Date of the price prediction (YYYY-MM-DD format).'),
  predictedPrice: z.number().describe('The predicted price for the commodity on the given date.'),
});

const PredictPriceTrendsOutputSchema = z.object({
  trendAnalysis: z.string().describe('An analysis of the predicted price trends, highlighting key patterns and insights.'),
  priceChartData: z.array(PriceTrendSchema).describe('An array of predicted price data points for generating a price chart.'),
  confidenceLevel: z.string().describe('The confidence level of the prediction (e.g., High, Medium, Low).'),
  recommendation: z.string().describe('Recommendation of whether to sell or hold.'),
});

export type PredictPriceTrendsOutput = z.infer<typeof PredictPriceTrendsOutputSchema>;

export async function predictPriceTrends(input: PredictPriceTrendsInput): Promise<PredictPriceTrendsOutput> {
  return predictPriceTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictPriceTrendsPrompt',
  input: {schema: PredictPriceTrendsInputSchema},
  output: {schema: PredictPriceTrendsOutputSchema},
  prompt: `You are an AI assistant that predicts price trends for agricultural commodities.

  Given the commodity: {{{commodity}}} and location: {{{location}}},
  analyze historical price data and relevant market factors to predict future price trends.

  Provide a trend analysis, predicted price data for generating a chart, a confidence level for the prediction, and a recommendation of whether to sell or hold the commodity.

  Trend Analysis:
  - Summarize the overall price trend (e.g., upward, downward, stable).
  - Identify key factors driving the trend (e.g., weather patterns, demand changes).

  Price Chart Data:
  - Provide an array of predicted price data points (date and predicted price) for the next 30 days.
  - Dates should be in YYYY-MM-DD format.
  - Predicted prices should be in the local currency.

  Confidence Level:
  - Assess the confidence level of the prediction (High, Medium, Low) based on the availability and reliability of historical data and market factors.

  Recommendation:
  - Provide a clear recommendation of whether to sell or hold the commodity based on the predicted price trends.

  Output in JSON format:
  {{output type="PredictPriceTrendsOutputSchema"}}
  `,
});

const predictPriceTrendsFlow = ai.defineFlow(
  {
    name: 'predictPriceTrendsFlow',
    inputSchema: PredictPriceTrendsInputSchema,
    outputSchema: PredictPriceTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
