
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Page() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Buyer & Co-op Network</h1>
                <p className="text-muted-foreground">Manage buyers (off-takers, processors, exporters) & co-ops.</p>
            </header>
            <Card className="flex flex-col items-center justify-center min-h-[400px]">
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This section is under construction.</p>
                </CardContent>
            </Card>
        </div>
    );
}
