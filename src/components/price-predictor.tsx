'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2, BarChart, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type PredictPriceTrendsOutput, type PredictPriceTrendsInput } from '@/ai/flows/predict-price-trends';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const formSchema = z.object({
  commodity: z.string().min(1, 'Please select a commodity'),
  location: z.string().min(1, 'Please enter a location'),
});

type PricePredictorProps = {
  predictAction: (input: PredictPriceTrendsInput) => Promise<PredictPriceTrendsOutput>;
};

export default function PricePredictor({ predictAction }: PricePredictorProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictPriceTrendsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commodity: 'maize',
      location: 'Kampala',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const prediction = await predictAction(values);
      setResult(prediction);
    } catch (e) {
      setError('Failed to get prediction. Please try again.');
      console.error(e);
    }
    setLoading(false);
  };

  const RecommendationIcon = () => {
    if (!result) return null;
    if (result.recommendation.toLowerCase().includes('sell')) {
      return <TrendingUp className="h-5 w-5 text-green-500" />;
    }
    if (result.recommendation.toLowerCase().includes('hold')) {
      return <TrendingDown className="h-5 w-5 text-red-500" />;
    }
    return <Minus className="h-5 w-5 text-gray-500" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BarChart className="h-6 w-6 text-primary" />
          AI Price Forecast
        </CardTitle>
        <CardDescription>Predict future price trends for your crops.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="commodity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commodity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a commodity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="maize">Maize</SelectItem>
                      <SelectItem value="beans">Beans</SelectItem>
                      <SelectItem value="coffee">Coffee</SelectItem>
                      <SelectItem value="cassava">Cassava</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kampala" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Predict Trends
            </Button>
          </CardFooter>
        </form>
      </Form>
      {error && <p className="p-4 text-sm text-destructive">{error}</p>}
      {result && (
        <div className="p-4 border-t">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.priceChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                <Line type="monotone" dataKey="predictedPrice" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-4">
            <h4 className="font-semibold">Analysis</h4>
            <p className="text-sm text-muted-foreground">{result.trendAnalysis}</p>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <RecommendationIcon />
                <span className="font-semibold text-sm">Recommendation:</span>
              </div>
              <span className="font-bold text-sm text-primary">{result.recommendation}</span>
            </div>
            <p className="text-xs text-center text-muted-foreground">Confidence Level: {result.confidenceLevel}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
