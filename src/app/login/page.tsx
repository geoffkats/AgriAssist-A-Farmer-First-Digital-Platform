
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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (isAdmin = false) => {
    setLoading(true);
    const loginEmail = isAdmin ? 'admin@agriassist.app' : email;
    const loginPassword = isAdmin ? 'adminpass' : password;

    try {
      await login(loginEmail, loginPassword);
      toast({
        title: 'Login Successful',
        description: `Welcome back${isAdmin ? ', Admin' : ''}!`,
      });
      if (isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
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
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="farmer@agriassist.app" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={() => handleLogin(false)} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Sign In
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => handleLogin(true)} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Sign In as Admin
          </Button>
           <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
