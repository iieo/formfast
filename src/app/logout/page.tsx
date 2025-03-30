'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

export default function Logout() {
  React.useEffect(() => {
    signOut({ callbackUrl: '/login' });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging out...</p>
    </div>
  );
}
