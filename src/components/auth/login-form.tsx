'use client';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Link from 'next/link';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type loginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginFormData>();
  const router = useRouter();

  const onSubmit = async (data: loginFormData) => {
    const { email, password } = data;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    console.info({ result });
    if (result === undefined || result.ok) {
      router.refresh();
    } else {
      setError('password', {
        type: 'manual',
        message: 'Falscher Benutzername oder Passwort',
      });
    }
  };

  return (
    <main className="w-full flex items-center justify-center">
      <div className="p-8 max-w-[750px] flex flex-col items-center justify-center shadow-none sm:shadow-xl rounded-[10px] w-full sm:w-5/6 md:w-3/4 lg:w-1/2 bg-white">
        <p className="text-2xl text-main-600 font-bold">Anmelden</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className=" text-main-900 text-xl font-semibold">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Sie müssen Ihre E-Mail-Adresse angeben',
              })}
              className="border-none bg-main-200 rounded-none w-full text-xl p-3 focus:outline-none"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className=" text-main-900 text-xl font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Sie müssen Ihr Passwort angeben',
              })}
              className="border-none bg-main-200 rounded-none w-full text-xl p-3 focus:outline-none"
            />
            <Link href="/reset-password" className="hover:underline text-sm font-semibold">
              Passwort vergessen?
            </Link>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="flex gap-3 justify-end mt-2 items-center">
            <Link href="/register" className="hover:underline text-sm font-semibold">
              Noch nicht registriert?
            </Link>
            <button
              type="submit"
              className="rounded-full justify-center py-2.5 px-5 border border-transparent text-white bg-main-700 hover:bg-black font-semibold text-xl"
            >
              Anmelden
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
