
'use client';

import AppLayout from '@/components/layout/app-layout';
import { ProStatusProvider } from '@/context/pro-status-context';
import { useAuth, AuthProvider } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) {
            return; // Wait for the loading to complete.
        }
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.role !== 'admin') {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user || user.role !== 'admin') {
        return <div className="flex h-screen items-center justify-center">Loading or redirecting...</div>;
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
      <AdminLayout>
        {children}
      </AdminLayout>
    </AuthProvider>
  );
}
