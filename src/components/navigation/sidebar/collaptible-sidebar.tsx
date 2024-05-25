'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSidebarVisibility } from './sidebar-provider';
import { cw } from '@/utils/tailwind/utils';

function CollapsibleSidebar({ children }: { children: React.ReactNode }) {
  const { isOpen, toggle } = useSidebarVisibility();

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={cw(
          'fixed z-20 inset-y-0 left-0 transition-all duration-200 transform w-[320px] md:relative',
          isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in md:w-0 md:translate-x-0',
        )}
      >
        <div className="absolute top-0 right-0 pt-2 pr-[1rem] md:hidden">
          <button
            className="hover:bg-gray-200 rounded-md focus:outline-none "
            onClick={() => toggle()}
          >
            {isOpen ? (
              <ChevronLeftIcon className="w-[1rem] h-[1rem]" />
            ) : (
              <ChevronRightIcon className="w-[1rem] h-[1rem]" />
            )}
          </button>
        </div>
        {isOpen && <div className="h-full overflow-y-auto bg-white">{children}</div>}
      </div>
    </div>
  );
}

export default CollapsibleSidebar;
