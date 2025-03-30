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
      router.push('/');
    } else {
      setError('password', {
        type: 'manual',
        message: 'Falscher Benutzername oder Passwort',
      });
    }
  };

  return (
    <main className="w-full flex items-center justify-center bg-main-900 py-12 px-4">
      <div className="p-8 max-w-md flex flex-col shadow-xl rounded-lg w-full bg-main-800 border border-main-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-indigo-400 font-bold mb-2">Anmelden</h1>
          <p className="text-gray-400">Melden Sie sich an, um fortzufahren</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-gray-300 text-base font-medium">
              E-Mail-Adresse
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="beispiel@email.com"
                {...register('email', {
                  required: 'Sie müssen Ihre E-Mail-Adresse angeben',
                })}
                className="border border-main-600 bg-main-700 rounded-md w-full p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-gray-300 text-base font-medium">
                Password
              </label>
              <Link
                href="/reset-password"
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
              >
                Passwort vergessen?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Sie müssen Ihr Passwort angeben',
                })}
                className="border border-main-600 bg-main-700 rounded-md w-full p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 py-3 px-5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-base transition-colors shadow-md flex justify-center items-center"
          >
            Anmelden
          </button>

          <div className="text-center mt-2">
            <p className="text-gray-400">
              Noch nicht registriert?{' '}
              <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Konto erstellen
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-main-700 flex justify-center">
          <p className="text-sm text-gray-500">
            © 2025 Your Company. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </main>
  );
}