'use client';

import { ChevronLeftIcon, HamburgerMenuIcon, Share2Icon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import { useSidebarVisibility } from './sidebar/sidebar-provider';
import Link from 'next/link';

export default function Header() {
  const { isOpen, toggle } = useSidebarVisibility();
  return (
    <div className="w-full flex justify-between items-center h-[3rem] px-2 bg-main-900">
      <button
        className="hover:bg-gray-200 rounded-md focus:outline-none p-1"
        onClick={() => toggle()}
      >
        {isOpen ? (
          <ChevronLeftIcon className="w-[1.5rem] h-[1.5rem] text-white" />
        ) : (
          <HamburgerMenuIcon className="w-[1.5rem] h-[1.5rem] text-white" />
        )}
      </button>
      {
        !isOpen && <></>
        //logo
      }
      <Link href="/form/create" className="hover:bg-gray-200 rounded-md focus:outline-none p-1">
        <Share2Icon className="w-[1.5rem] h-[1.5rem] text-white" />
      </Link>
    </div>
  );
}
