import AppLayout from '@/components/layout/app-layout';
import { ProStatusProvider } from '@/context/pro-status-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProStatusProvider>
      <AppLayout>{children}</AppLayout>
    </ProStatusProvider>
  );
}
