import { dbGetFormsByUserId } from '@/db/functions/form';
import { getUser } from '@/utils/auth';
import Link from 'next/link';
export default async function ChatHome(context: unknown) {
  const user = await getUser();
  const forms = await dbGetFormsByUserId(user.id);
  return (
    <div className="flex-grow bg-main-800 w-full text-white grid grid-cols-3 gap-4 p-4 overflow-y-auto">
      {forms.map((form) => (
        <Link
          key={form.id}
          href={`/form/edit/${form.id}`}
          className="w-full h-[10rem] border rounded flex items-center justify-center bg-main-800 hover:bg-main-700 transition-colors"
        >
          <p className="text-centerr text-xl">{form.name}</p>
        </Link>
      ))}
    </div>
  );
}
