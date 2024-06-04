import FormEditor from '@/components/form/form-editor';
import { dbGetFormById, dbGetFormFieldsByFormId } from '@/db/functions/form';
import { getUser } from '@/utils/auth';
import { buttonClassName } from '@/utils/tailwind/button';
import Link from 'next/link';
import { z } from 'zod';

const pageContextSchema = z.object({
  params: z.object({
    id: z.coerce.string().min(1),
  }),
});

export default async function Page(context: unknown) {
  const result = pageContextSchema.safeParse(context);

  if (!result.success) {
    return (
      <div className="flex flex-col justify-center items-center flex-grow h-[calc(100dvh-3rem-2rem)] w-full px-12">
        <h1>Error</h1>
        <p>This form does not exist</p>
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
  const user = await getUser();

  if (form.createdBy !== user.id) {
    <div className="flex-1 flex flex-col gap-2 items-center justify-center">
      <h3 className="text-white text-2xl">Permission denied</h3>
      <p className="text-white text-lg">This is not your form</p>
      <Link href="/" className={buttonClassName}>
        Back
      </Link>
    </div>;
  }

  const formFields = await dbGetFormFieldsByFormId(form.id);

  // await dbUpdateFormContent(form.id, [
  //   { required: false, type: 'heading', title: 'test', subtitle: 'tests' },
  //   { required: false, type: 'heading', title: 'test2', subtitle: 'test2s' },
  //   { required: false, type: 'short-text', label: 'test2', sublabel: 'test2s' },
  //   { required: false, type: 'submit', buttonText: 'Submit' },
  // ]);

  return <FormEditor form={form} formFields={formFields} />;
}
