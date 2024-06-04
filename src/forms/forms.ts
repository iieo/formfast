export type FormField = ShortTextFormFieldProps | HeadingFormFieldProps | SubmitFormFieldProps;

export type FormFieldType = 'heading' | 'short-text' | 'submit';

export type CommonFormProps = {
  required: boolean;
};

export type HeadingFormFieldProps = CommonFormProps & {
  type: 'heading';
  title: string;
  subtitle: string;
};

export type ShortTextFormFieldProps = CommonFormProps & {
  type: 'short-text';
  label: string;
  sublabel: string;
};

export type SubmitFormFieldProps = CommonFormProps & {
  type: 'submit';
  buttonText: string;
};

export type FieldSubmission = {
  formFieldId: string;
  value: string | undefined;
};
