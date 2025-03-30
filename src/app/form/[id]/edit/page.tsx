import FormEditor from '@/app/form/[id]/edit/form-editor';
import { dbGetFormById, dbGetFormFieldsByFormId } from '@/db/functions/form';
import { getUser } from '@/auth/utilts';
import { buttonClassName } from '@/utils/tailwind/button';
import Link from 'next/link';




export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: formId } = await params;

  const form = await dbGetFormById(formId);
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

  return <FormEditor form={form} formFields={formFields} />;
}
