'use client';
import { UserRow } from '@/db/types';
import { cw } from '@/utils/tailwind/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AvatarIcon, ExitIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';


export default function ProfileMenu({ user }: { user: UserRow }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };
  return (
    <DropdownMenu.Root onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Update dimensions"
          className={clsx(
            'flex flex-row gap-2 items-center py-2 px-4 w-full rounded-[10px]',
            isOpen ? 'bg-main-200' : 'bg-transparent',
          )}
        >
          <AvatarIcon color="white" width={25} height={25} />
          <div className="w-full text-white">
            <p className="truncate font-semibold text-left w-full">
              {user.firstName} {user.lastName}
            </p>

            <p className="truncate text-left">Kostenloser Account</p>
          </div>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="z-20 flex flex-col gap-2 py-2 w-[256px] bg-main-200 rounded-[10px]"
        >
          <p className="p-2 truncate font-semibold">{user.email}</p>
          <hr />
          <Link href="/settings/personal-information" className="text-start p-2">
            Account-Einstellungen
          </Link>

          <Link
            href="https://deutschlandgpt.de/data-privacy/"
            target="_blank"
            className="text-start p-2"
          >
            Datenschutz
          </Link>
          <Link
            target="_blank"
            href="https://deutschlandgpt.de/imprint/"
            className="text-start p-2"
          >
            Impressum
          </Link>
          <hr />
          <div className="p-2">
            <button onClick={handleLogout} className="flex flex-row gap-2 items-center">
              <ExitIcon />
              <p>Abmelden</p>
            </button>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
