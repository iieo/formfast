import React from 'react';

import { redirect } from 'next/navigation';
import AuthNavbar from '@/components/auth/auth-header';
import AuthFooter from '@/components/auth/auth-footer';
import { getMaybeSession } from '@/auth/utilts';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getMaybeSession();

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
