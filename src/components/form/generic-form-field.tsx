import { FormFieldRow } from '@/db/types';
import { ForwardedRef, forwardRef } from 'react';
import HeadingFormField from './solve-form-field/heading-form-field';
import ShortInputFormField from './solve-form-field/short-input-form-field';
import Submit from './solve-form-field/submit-form-field';

const GenericFormField = forwardRef(
  ({ formField, ...props }: { formField: FormFieldRow }, ref: ForwardedRef<any | null>) => {
    switch (formField.content.type) {
      case 'heading':
        return <HeadingFormField formField={formField} {...props} />;
      case 'short-text':
        return <ShortInputFormField ref={ref} formField={formField} {...props} />;
      case 'submit':
        return <Submit formField={formField} {...props} />;
      default:
        return null;
    }
  },
);

export default GenericFormField;
