import Link from 'next/link';

export default function AuthFooter() {
  return (
    <div className="flex flex-wrap items-center justify-center bg-neutral-800 py-2 w-full text-white gap-4 sm:gap-4 md:gap-8 font-light text-sm p-2">
      <Link href="/imprint">Impressum</Link>
      <Link href="/terms">AGBs</Link>
      <Link href="/data-privacy">Datenschutz</Link>
    </div>
  );
}
