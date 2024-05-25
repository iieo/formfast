'use client';
import { Form } from '@/db/types';
import Header from '../common/header';
import { dbUpdateFormName } from '@/db/functions/form';

export default function FormEditor({ form }: { form: Form }) {
  return (
    <>
      <Header title="Edit Form" />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="rouded bg-main-400 w-full min-h-[10rem] max-w-[50rem]">
          <input
            onChange={(e) => {
              dbUpdateFormName(form.id, e.target.value.trim());
            }}
            defaultValue={form.name}
          />
        </div>
      </div>
    </>
  );
}
