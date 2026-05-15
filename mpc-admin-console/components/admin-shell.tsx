import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';

export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8">
        <Topbar title={title} subtitle={subtitle} />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
