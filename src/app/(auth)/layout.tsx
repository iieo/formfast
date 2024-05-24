import React from 'react';
import { getMaybeSession } from '@/utils/auth';
import { redirect } from 'next/navigation';
import AuthNavbar from '@/components/auth/auth-header';
import AuthFooter from '@/components/auth/auth-footer';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getMaybeSession();

  console.log(session);

  if (session !== null) {
    redirect('/');
  }

  return (
    <div className="flex flex-col justify-between min-h-[100vh] bg-white">
      <AuthNavbar />
      {children}
      <AuthFooter />
    </div>
  );
}
