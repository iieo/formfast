'use client';

import { FormFieldRow, FormRow, FormSubmissionRow } from '@/db/types';
import { useForm } from 'react-hook-form';
import GenericFormField from './generic-form-field';
import { useRouter } from 'next/navigation';
import { dbCreateSubmission } from '@/db/functions/form';
import { FieldSubmission } from '@/forms/forms';

export default function FormSolver({
  form,
  formFields,
}: {
  form: FormRow;
  formFields: FormFieldRow[];
}) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = async (data: { [key: string]: string }) => {
    const submissionData: FieldSubmission[] = Object.keys(data)
      .map((key) => {
        return {
          formFieldId: key,
          value: data[key],
        };
      })
      .filter((item) => !!item.value);

    await dbCreateSubmission(form.id, submissionData);

    //TODO: save id to localstorage

    router.push('/form/thank-you');
  };

  return (
    <div className="flex flex-col items-center p-12 flex-grow overflow-y-auto">
      <div className="rounded bg-main-800 w-full max-w-[50rem] p-4 flex flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map((formField) => {
            return <GenericFormField formField={formField} {...register(formField.id)} />;
          })}
        </form>
      </div>
    </div>
  );
}
