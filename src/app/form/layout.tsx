import { getUser } from '@/utils/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-[100dvh] bg-main-800 flex flex-col">{children}</div>;
}
