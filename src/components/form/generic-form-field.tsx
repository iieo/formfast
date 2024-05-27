import { FormFieldRow } from '@/db/types';
import HeadingFormField from './edit-form-field/heading-form-field';
import ShortInput from './edit-form-field/short-input-form-field';
import Submit from './edit-form-field/submit-form-field';

function GenericFormField({
  formField,
  setField,
}: {
  formField: FormFieldRow;
  setField: (field: FormFieldRow) => void;
}) {
  switch (formField.content.type) {
    case 'heading':
      return <HeadingFormField setField={setField} formField={formField} />;
    case 'short-text':
      return <ShortInput setField={setField} formField={formField} />;
    case 'submit':
      return <Submit setField={setField} formField={formField} />;
  }
}

export default GenericFormField;
