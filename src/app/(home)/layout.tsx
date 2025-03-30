import { getMaybeUser, getUser } from '@/auth/utilts';
import Header from '@/components/navigation/header';
import ProfileMenu from '@/components/navigation/profile-menu';
import CollapsibleSidebar from '@/components/navigation/sidebar/collaptible-sidebar';
import { SidebarVisibilityProvider } from '@/components/navigation/sidebar/sidebar-provider';

import { buttonClassName } from '@/utils/tailwind/button';
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
          <div className="h-[100dvh] flex bg-main-900 px-2 py-8 flex-col justify-between items-center ">
            <Link href="/form/create" className={cw(buttonClassName, 'my-6 bg-main-800 w-full')}>
              <PlusIcon className="text-main-400" />
              <p className="text-center text-lg font-semibold">Create new Form</p>
            </Link>
            <div className="flex-grow"></div>
            <ProfileMenu user={user} />
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
