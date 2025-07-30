
'use client';

import AppLayout from '@/components/layout/app-layout';
import { ProStatusProvider } from '@/context/pro-status-context';
import { useAuth, AuthProvider } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AppWithAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // You can replace this with a proper loading spinner
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <ProStatusProvider>
      <AppLayout>{children}</AppLayout>
    </ProStatusProvider>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AppWithAuth>
        {children}
      </AppWithAuth>
    </AuthProvider>
  );
}
