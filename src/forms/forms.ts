export type FormContent = FormField[];

export type FormField = {
  required: boolean;
} & (ShortTextFormField | HeadingFormField);

export type HeadingFormField = {
  type: 'heading';
  title: string;
  subtitle: string;
};

export type ShortTextFormField = {
  type: 'short-text';
  label: string;
  sublabel: string;
};
