
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wheat } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleSignup = async () => {
    setLoading(true);
    try {
      await signup(name, email, password);
      toast({
        title: 'Account Created!',
        description: 'Welcome to AgriAssist. Please log in.',
      });
      router.push('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: (error as Error).message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
       <Card className="w-full max-w-sm">
         <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center gap-2">
                <Wheat className="h-10 w-10 text-primary" />
                <h1 className="text-3xl font-bold font-headline">AgriAssist</h1>
            </div>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Join our community of smart farmers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="farmer@agriassist.app" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button className="w-full" onClick={handleSignup} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Create Account
          </Button>
           <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

