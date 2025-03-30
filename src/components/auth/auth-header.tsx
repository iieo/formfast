import Link from 'next/link';

export default function AuthNavbar() {
  return (
    <div className="flex items-center justify-between px-8 border-b border-main-700 min-h-[4rem] max-h-[4rem]">
      <Link href="/login" className="text-lg font-bold text-white">
        FormFast
      </Link>
    </div>
  );
}
