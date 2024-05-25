import { cw } from '@/utils/tailwind/utils';

export default function Divider({ className }: { className?: string }) {
  return <div className={cw('w-full h-[1px] bg-main-400 my-4', className)} />;
}
