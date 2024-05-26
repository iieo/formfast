'use client';

import { FormField } from '@/forms/forms';
import Draggable from '../dnd/draggable';

export default function AddFormFieldDraggable({
  id,
  icon,
  title,
  formField,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  formField: FormField;
}) {
  return (
    <Draggable id={id} className="w-full" data={{ type: 'add-form-field', field: formField }}>
      <div className="w-full group h-full">
        <div className="flex w-full h-full">
          <div className="p-4 bg-main-800 flex h-full  group-hover:bg-slate-800 items-center">
            {icon}
          </div>
          <div className="flex-grow bg-main-700 p-4 group-hover:bg-slate-700">{title}</div>
        </div>
        <div className="h-[1px] bg-main-600 w-full" />
      </div>
    </Draggable>
  );
}
