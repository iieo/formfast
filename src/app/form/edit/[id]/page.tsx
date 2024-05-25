import FormEditor from '@/components/form/form-editor';
import { dbGetFormById } from '@/db/functions/form';
import { buttonClassName } from '@/utils/tailwind/button';
import Link from 'next/link';
import { z } from 'zod';

const pageContextSchema = z.object({
  params: z.object({
    id: z.coerce.string().min(1),
  }),
});

export default async function ChatHome(context: unknown) {
  const result = pageContextSchema.safeParse(context);

  if (!result.success) {
    return (
      <div className="flex flex-col justify-center items-center flex-grow h-[calc(100dvh-3rem-2rem)] w-full px-12">
        <h1>Fehler</h1>
        <p>Bitte gib korrekte Parameter an</p>
      </div>
    );
  }

  const { id } = result.data.params;
  const form = await dbGetFormById(id);
  if (!form) {
    return (
      <div className="flex-1 flex flex-col gap-2 items-center justify-center">
        <h3 className="text-white text-2xl">Invalid id</h3>
        <Link href="/" className={buttonClassName}>
          Back
        </Link>
      </div>
    );
  }

  return <FormEditor form={form} />;
}
