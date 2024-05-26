import { FormField, ShortTextFormFieldProps } from '@/forms/forms';

export default function ShortInput({
  content,
  setField,
}: {
  content: ShortTextFormFieldProps;
  setField: (field: FormField) => void;
}) {
  return (
    <div className="p-12 flex flex-col gap-2 rounded focus-within:outline outline-2 outline-main-700">
      <input
        className="bg-transparent text-xl w-full focus:outline-0 text-main-100"
        onChange={(e) => {
          setField({ ...content, label: e.target.value });
        }}
        defaultValue={content.label}
        placeholder="Label"
      />
      <input
        disabled
        className="bg-transparent text-3xl w-full focus:outline-0 text-main-100 outline outline-2 rounded"
      />
      <input
        className="bg-transparent text-sm w-full  focus:outline-0 text-main-400"
        onChange={(e) => {
          setField({ ...content, sublabel: e.target.value });
        }}
        defaultValue={content.sublabel}
        placeholder="Sublabel"
      />
    </div>
  );
}
