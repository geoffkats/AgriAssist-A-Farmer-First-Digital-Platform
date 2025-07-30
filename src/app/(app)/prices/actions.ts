
'use server';

import { predictPriceTrends, type PredictPriceTrendsInput } from '@/ai/flows/predict-price-trends';

export async function predictAction(input: PredictPriceTrendsInput) {
  return await predictPriceTrends(input);
}
