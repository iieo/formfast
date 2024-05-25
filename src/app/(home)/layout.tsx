import Header from '@/components/navigation/header';
import ProfileMenu from '@/components/navigation/profile-menu';
import CollapsibleSidebar from '@/components/navigation/sidebar/collaptible-sidebar';
import { SidebarVisibilityProvider } from '@/components/navigation/sidebar/sidebar-provider';
import { getUser } from '@/utils/auth';
import { primaryButtonClassName } from '@/utils/tailwind/button';
import { cw } from '@/utils/tailwind/utils';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <div className="flex h-[100dvh] w-[100dvw]">
      <SidebarVisibilityProvider>
        <CollapsibleSidebar>
          <div className="h-[100dvh] flex bg-main-100 p-8 flex-col justify-between items-center ">
            <section className="w-full">
              <Link href="/" className={cw(primaryButtonClassName, 'my-6 bg-main-800')}>
                <PlusIcon className="text-main-400" />
                <p className="text-center text-lg font-semibold">Neues Gespräch</p>
              </Link>
              <ProfileMenu {...user} />
            </section>
          </div>
        </CollapsibleSidebar>
        <div className="flex flex-col justify-center items-center w-full">
          <Header />
          {children}
        </div>
      </SidebarVisibilityProvider>
    </div>
  );
}
