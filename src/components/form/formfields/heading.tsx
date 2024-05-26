import { FormField, HeadingFormField } from '@/forms/forms';

export default function Heading({
  content,
  setField,
}: {
  content: HeadingFormField;
  setField: (field: FormField) => void;
}) {
  return (
    <div className="p-12 rounded focus-within:outline outline-2 outline-main-700">
      <input
        className="bg-transparent text-3xl w-full focus:outline-0 text-main-100"
        onChange={(e) => {
          setField({ ...content, title: e.target.value });
        }}
        defaultValue={content.title}
      />
      <input
        className="bg-transparent text-lg w-full  focus:outline-0 text-main-400"
        onChange={(e) => {
          setField({ ...content, subtitle: e.target.value });
        }}
        defaultValue={content.subtitle}
      />
    </div>
  );
}
