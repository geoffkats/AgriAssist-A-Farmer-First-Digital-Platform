
'use client';

import dynamic from 'next/dynamic';
import { useAuth } from '@/context/auth-context';

const DashboardClientContent = dynamic(() => import('@/components/dashboard-client-content'), {
  ssr: false,
  loading: () => <p>Loading dashboard...</p>
});

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return <DashboardClientContent user={user} />;
}
