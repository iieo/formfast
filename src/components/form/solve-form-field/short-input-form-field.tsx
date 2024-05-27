import { FormFieldRow } from '@/db/types';
import { ShortTextFormFieldProps } from '@/forms/forms';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

interface ShortInputProps {
  formField: FormFieldRow;
}

const ShortInput = React.forwardRef<HTMLInputElement, ShortInputProps>(
  ({ formField, ...props }: ShortInputProps, ref: React.Ref<HTMLInputElement>) => {
    const content = formField.content as ShortTextFormFieldProps;
    return (
      <div className="p-12 flex flex-col gap-2 rounded">
        <h4 className="bg-transparent text-xl w-full focus:outline-0 text-main-100">
          {content.label}
        </h4>
        <input
          {...props}
          ref={ref}
          className="bg-transparent text-3xl w-full focus:outline-0 text-main-100 outline outline-2 rounded"
        />
        <h5 className="bg-transparent text-sm w-full  focus:outline-0 text-main-400">
          {content.sublabel}
        </h5>
      </div>
    );
  },
);

export default ShortInput;
