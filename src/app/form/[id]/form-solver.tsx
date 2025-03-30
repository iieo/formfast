'use client';

import { FormFieldRow, FormRow } from '@/db/types';
import { useForm } from 'react-hook-form';
import GenericFormField from '../../../components/form/generic-form-field';
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

    router.push('/form/thank-you');
  };

  return (
    <div className="flex flex-col items-center p-6 md:p-12 flex-grow min-h-screen bg-main-900 overflow-y-auto">
      <div className="w-full max-w-3xl my-8">
        <div className="bg-indigo-800 text-white py-10 px-8 rounded-t-lg">
          <h1 className="text-2xl font-semibold mb-2">{form.name || "Untitled Form"}</h1>
          {form.status && <p className="text-indigo-200">{form.status}</p>}
        </div>

        <div className="bg-main-800 rounded-b-lg shadow-md border border-main-700">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="divide-y divide-main-700">
              {formFields.map((formField, index) => (
                <div key={formField.id} className="py-6 px-8">
                  <GenericFormField
                    formField={formField}
                    {...register(formField.id)}
                  />
                </div>
              ))}
            </div>

            {/* Submit button container - only shown if no submit button in form */}
            {!formFields.some(field => field.content.type === 'submit') && (
              <div className="py-6 px-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-md font-medium transition-colors shadow-sm"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="mt-4 text-center text-gray-400 text-sm">
          <p>Powered by FormFast</p>
        </div>
      </div>
    </div>
  );
}