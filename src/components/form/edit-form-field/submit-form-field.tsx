import { FormField, HeadingFormFieldProps, SubmitFormFieldProps } from '@/forms/forms';
import { buttonClassName } from '@/utils/tailwind/button';
import { cw } from '@/utils/tailwind/utils';

export default function Submit({
  content,
  setField,
}: {
  content: SubmitFormFieldProps;
  setField: (field: FormField) => void;
}) {
  return (
    <div className="p-12 rounded focus-within:outline outline-2 outline-main-700 flex justify-center items-center w-full">
      <input
        className={cw(buttonClassName, 'text-center')}
        onChange={(e) => {
          setField({ ...content, buttonText: e.target.value });
        }}
        defaultValue={content.buttonText}
      />
    </div>
  );
}
