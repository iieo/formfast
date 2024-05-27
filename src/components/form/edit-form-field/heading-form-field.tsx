import { FormFieldRow } from '@/db/types';
import { HeadingFormFieldProps } from '@/forms/forms';

export default function HeadingFormField({
  formField,
  setField,
}: {
  formField: FormFieldRow;
  setField: (field: FormFieldRow) => void;
}) {
  const content = formField.content as HeadingFormFieldProps;
  return (
    <div className="p-12 rounded focus-within:outline outline-2 outline-main-700">
      <input
        className="bg-transparent text-3xl w-full focus:outline-0 text-main-100"
        onChange={(e) => {
          setField({ ...formField, content: { ...content, title: e.target.value } });
        }}
        defaultValue={content.title}
      />
      <input
        className="bg-transparent text-lg w-full  focus:outline-0 text-main-400"
        onChange={(e) => {
          setField({ ...formField, content: { ...content, subtitle: e.target.value } });
        }}
        defaultValue={content.subtitle}
      />
    </div>
  );
}
