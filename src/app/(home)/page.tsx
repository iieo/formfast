import { getUser } from '@/auth/utilts';
import { dbGetFormsByUserId } from '@/db/functions/form';

import Link from 'next/link';
export default async function Home(context: unknown) {
  const user = await getUser();
  const forms = await dbGetFormsByUserId();
  return (
    <div className="flex-grow bg-main-800 w-full text-white grid grid-cols-3 gap-4 p-4 overflow-y-auto">
      {forms.map((form) => (
        <Link
          key={form.id}
          href={`/form/${form.id}/edit`}
          className="w-full h-[10rem] border rounded flex items-center justify-center bg-main-800 hover:bg-main-700 transition-colors"
        >
          <p className="text-centerr text-xl">{form.name}</p>
        </Link>
      ))}
    </div>
  );
}
