import { FormField } from '@/forms/forms';
import ShortInput from './edit-form-field/short-input-form-field';
import HeadingFormField from './edit-form-field/heading-form-field';
import Submit from './edit-form-field/submit-form-field';

function GenericFormField({
  content,
  setField,
}: {
  content: FormField;
  setField: (field: FormField) => void;
}) {
  switch (content.type) {
    case 'heading':
      return <HeadingFormField setField={setField} content={content} />;
    case 'short-text':
      return <ShortInput setField={setField} content={content} />;
    case 'submit':
      return <Submit setField={setField} content={content} />;
  }
}

export default GenericFormField;
