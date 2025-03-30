import { dbGetFormById, dbGetFormFieldsByFormId } from '@/db/functions/form';
import { buttonClassName } from '@/utils/tailwind/button';
import { Metadata } from 'next';
import Link from 'next/link';
import FormSolver from './form-solver';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: formId } = await params;
  const form = await dbGetFormById(formId);
  return {
    title: `FormFast - ${form?.name || 'Form'}`,
    description: 'Erstelle deine eigenen Forms',
  };
}


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: formId } = await params;
  const form = await dbGetFormById(formId);
  if (!form) {
    return (
      <div className="flex-1 flex flex-col gap-2 items-center justify-center overflow-y-auto">
        <h3 className="text-white text-2xl">Invalid id</h3>
        <Link href="/" className={buttonClassName}>
          Back
        </Link>
      </div>
    );
  }

  const formFields = await dbGetFormFieldsByFormId(form.id);
  return <FormSolver form={form} formFields={formFields} />;
}
