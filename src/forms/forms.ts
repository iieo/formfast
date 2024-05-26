export type FormContent = FormField[];

export type FormField = ShortTextFormField | HeadingFormField | SubmitFormField;

export type FormFieldType = 'heading' | 'short-text' | 'submit';

export type CommonFormProps = {
  required: boolean;
};

export type HeadingFormField = CommonFormProps & {
  type: 'heading';
  title: string;
  subtitle: string;
};

export type ShortTextFormField = CommonFormProps & {
  type: 'short-text';
  label: string;
  sublabel: string;
};

export type SubmitFormField = CommonFormProps & {
  type: 'submit';
  buttonText: string;
};
