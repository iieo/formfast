import Header from '@/components/navigation/header';
import ProfileMenu from '@/components/navigation/profile-menu';
import CollapsibleSidebar from '@/components/navigation/sidebar/collaptible-sidebar';
import { SidebarVisibilityProvider } from '@/components/navigation/sidebar/sidebar-provider';
import { dbGetFormsByUserId } from '@/db/functions/form';
import { getUser } from '@/auth/utilts';
import { buttonClassName } from '@/utils/tailwind/button';
import { cw } from '@/utils/tailwind/utils';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
export default async function Page() {
  const user = await getUser();
  const forms = await dbGetFormsByUserId();
  return (
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
        <div>test</div>
      </div>
    </SidebarVisibilityProvider>
  );
}
