import React from 'react';

import AuthNavbar from '@/components/auth/auth-header';
import AuthFooter from '@/components/auth/auth-footer';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between h-[100vh] bg-main-900 overflow-scroll">
      <AuthNavbar />
      {children}
      <AuthFooter />
    </div>
  );
}
