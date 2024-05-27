import { FormFieldRow } from '@/db/types';
import { HeadingFormFieldProps } from '@/forms/forms';

export default function HeadingFormField({ formField }: { formField: FormFieldRow }) {
  const content = formField.content as HeadingFormFieldProps;
  return (
    <div className="p-12 rounded">
      <h2 className="bg-transparent text-3xl w-full focus:outline-0 text-main-100">
        {content.title}
      </h2>
      <h3 className="bg-transparent text-lg w-full  focus:outline-0 text-main-400">
        {content.subtitle}
      </h3>
    </div>
  );
}
