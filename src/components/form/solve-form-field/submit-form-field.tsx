import { FormFieldRow } from '@/db/types';
import { SubmitFormFieldProps } from '@/forms/forms';
import { buttonClassName } from '@/utils/tailwind/button';
import { cw } from '@/utils/tailwind/utils';

export default function Submit({ formField }: { formField: FormFieldRow }) {
  const content = formField.content as SubmitFormFieldProps;
  return (
    <div className="p-12 rounded  flex justify-center items-center w-full">
      <button className={cw(buttonClassName, 'text-center')}>{content.buttonText}</button>
    </div>
  );
}
