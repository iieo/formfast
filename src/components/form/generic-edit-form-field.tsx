import { FormFieldRow } from '@/db/types';
import EditHeadingFormField from './edit-form-field/heading-edit-form-field';
import EditShortInput from './edit-form-field/short-input-edit-form-field';
import EditSubmit from './edit-form-field/submit-edit-form-field';

function GenericEditFormField({
  formField,
  setField,
}: {
  formField: FormFieldRow;
  setField: (field: FormFieldRow) => void;
}) {
  switch (formField.content.type) {
    case 'heading':
      return <EditHeadingFormField setField={setField} formField={formField} />;
    case 'short-text':
      return <EditShortInput setField={setField} formField={formField} />;
    case 'submit':
      return <EditSubmit setField={setField} formField={formField} />;
  }
}

export default GenericEditFormField;
