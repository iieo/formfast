import { FormField } from '@/forms/forms';
import ShortInput from './formfields/short-input';
import Heading from './formfields/heading';
import Submit from './formfields/submit';

function GenericFormField({
  content,
  setField,
}: {
  content: FormField;
  setField: (field: FormField) => void;
}) {
  switch (content.type) {
    case 'heading':
      return <Heading setField={setField} content={content} />;
    case 'short-text':
      return <ShortInput setField={setField} content={content} />;
    case 'submit':
      return <Submit setField={setField} content={content} />;
  }
}

export default GenericFormField;
