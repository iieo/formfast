'use client';
import { dbCreateForm } from '@/db/functions/form';
import { getUser } from '@/auth/utilts';
import { buttonClassName } from '@/utils/tailwind/button';
import { inputClassName } from '@/utils/tailwind/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createFormSchema = z.object({
  name: z.string().max(40),
});

type createFormData = z.infer<typeof createFormSchema>;

export default function CreateForm() {
  const { handleSubmit, register } = useForm<createFormData>({
    resolver: zodResolver(createFormSchema),
  });
  const router = useRouter();

  async function onSubmit(data: createFormData) {
    let name = data.name.trim();
    if (!name) {
      name = 'Form';
    }
    const formId = await dbCreateForm(name);
    router.push(`/form/${formId}/edit`);
  }
  return (
    <div className="flex-1 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-4">
        <div className="text-2xl font-bold text-white">Create your form</div>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            {...register('name')}
            placeholder="Form name"
            className={inputClassName}
          />
          <button type="submit" className={buttonClassName}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
