'use client';

import { ChevronLeftIcon, HamburgerMenuIcon, Share2Icon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import { useSidebarVisibility } from './sidebar/sidebar-provider';

export default function Header() {
  const { isOpen, toggle } = useSidebarVisibility();
  return (
    <div className="w-full flex justify-between items-center h-[3rem] px-2">
      <button
        className="hover:bg-gray-200 rounded-md focus:outline-none p-1"
        onClick={() => toggle()}
      >
        {isOpen ? (
          <ChevronLeftIcon className="w-[1.5rem] h-[1.5rem]" />
        ) : (
          <HamburgerMenuIcon className="w-[1.5rem] h-[1.5rem]" />
        )}
      </button>
      {
        !isOpen && <></>
        //logo
      }
      <button
        className="hover:bg-gray-200 rounded-md focus:outline-none p-1"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            toast('Link erfolgreich kopiert!');
          } catch (err) {
            toast('Kopieren fehlgeschlagen');
          }
        }}
      >
        <Share2Icon className="w-[1.5rem] h-[1.5rem]" />
      </button>
    </div>
  );
}
