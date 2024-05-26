import { User } from '@/db/types';
import { AvatarIcon } from '@radix-ui/react-icons';

function Header({ user, title }: { user?: User; title: string }) {
  return (
    <div className="flex items-center justify-between px-8 border-b border-main-700 min-h-[4rem] max-h-[4rem]">
      <div className="text-lg font-bold text-white">FormFast</div>
      <div className="text-lg font-bold text-white">{title}</div>
      <div className="flex items-center">
        {user && (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-white">{user.firstName}</div>
            <AvatarIcon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
