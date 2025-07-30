import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/auth-context';
import { PT_Sans } from 'next/font/google'

const ptSans = PT_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-pt-sans' })

export const metadata: Metadata = {
  title: 'AgriAssist',
  description: 'A farmer-first application for market intelligence, agronomic support, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={ptSans.variable}>
      <head/>
      <body className="font-body antialiased" suppressHydrationWarning>
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
