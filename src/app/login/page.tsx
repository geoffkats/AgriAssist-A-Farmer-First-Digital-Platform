
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
import { Loader2, Wheat, User, Shield, Building } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.658-3.344-11.303-7.918l-6.522,5.023C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,34.551,44,29.861,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
    )
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (loginType?: 'admin' | 'buyer' | 'farmer') => {
    setLoading(true);
    let loginEmail = email;
    let loginPassword = password;

    if (loginType === 'admin') {
      loginEmail = 'admin@agriassist.app';
      loginPassword = 'adminpass';
    } else if (loginType === 'buyer') {
        loginEmail = 'buyer.user@agriassist.app';
        loginPassword = 'buyerpass';
    } else if (loginType === 'farmer') {
        loginEmail = 'farmer@agriassist.app';
        loginPassword = 'farmerpass';
    }


    try {
      const user = await login(loginEmail, loginPassword);
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name.split(' ')[0]}!`,
      });
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push(user.role === 'buyer' ? '/buyers' : '/');
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
        const user = await login('google.user@agriassist.app', 'googlepass');
        toast({
            title: 'Login Successful',
            description: 'Welcome back!',
        });
        if (user.role === 'admin') {
            router.push('/admin/dashboard');
        } else {
            router.push('/');
        }
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: 'Could not sign in with Google. Please try again.',
        });
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-2">
            <Wheat className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-headline">AgriAssist</h1>
          </div>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
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
          <Button className="w-full" onClick={() => handleLogin()} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          <div className="relative w-full">
            <Separator className="my-2" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">OR</span>
          </div>
           <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="mr-2 h-5 w-5" />}
            Sign in with Google
          </Button>
           <p className="text-center text-xs text-muted-foreground">
            For simulation purposes:
          </p>
          <div className="grid grid-cols-3 gap-2 w-full">
             <Button variant="secondary" className="w-full" onClick={() => handleLogin('farmer')} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <User />}
                Farmer
            </Button>
             <Button variant="secondary" className="w-full" onClick={() => handleLogin('buyer')} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Building />}
                Buyer
            </Button>
             <Button variant="secondary" className="w-full" onClick={() => handleLogin('admin')} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield />}
                Admin
            </Button>
          </div>
           <p className="text-center text-sm text-muted-foreground pt-4">
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
