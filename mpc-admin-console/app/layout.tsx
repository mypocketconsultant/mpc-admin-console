import './globals.css';
import type { Metadata } from 'next';
import { AuthGuard } from '@/components/auth-guard';

export const metadata: Metadata = {
  title: 'MPC Admin Console',
  description: 'Admin console for My Pocket Consultant',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
