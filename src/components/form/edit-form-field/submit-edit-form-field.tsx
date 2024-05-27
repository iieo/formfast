import { FormFieldRow } from '@/db/types';
import { SubmitFormFieldProps } from '@/forms/forms';
import { buttonClassName } from '@/utils/tailwind/button';
import { cw } from '@/utils/tailwind/utils';

export default function EditSubmit({
  formField,
  setField,
}: {
  formField: FormFieldRow;
  setField: (field: FormFieldRow) => void;
}) {
  const content = formField.content as SubmitFormFieldProps;
  return (
    <div className="p-12 rounded focus-within:outline outline-2 outline-main-700 flex justify-center items-center w-full">
      <input
        className={cw(buttonClassName, 'text-center')}
        onChange={(e) => {
          setField({ ...formField, content: { ...content, buttonText: e.target.value } });
        }}
        defaultValue={content.buttonText}
      />
    </div>
  );
}
