'use client';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { dbCreateNewUser } from '@/db/functions/user';

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: 'Die eingegebene E-Mail-Adresse ist nicht gültig' }),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8, {
      message: 'Das Passwort muss mindestens acht Zeichen lang sein',
    }),
    passwordConfirm: z.string().min(8, {
      message: 'Das Passwort muss mindestens acht Zeichen lang sein',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Die Passwörter stimmen nicht überein',
    path: ['passwordConfirm'],
  });
type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const [error, setError] = React.useState<string | undefined>(undefined);

  const emailValue = watch('email');

  // this use effect resets the email error if the email input field is used again.
  React.useEffect(() => {
    if (error !== undefined) {
      setError(undefined);
    }
  }, [emailValue, error]);

  const onSubmit = async (data: RegisterFormData) => {
    const { email: _email, password, firstName, lastName } = data;
    const email = _email.trim().toLowerCase();

    const { error } = await dbCreateNewUser(email, password, firstName, lastName);

    if (error !== null) {
      setError(error);
      return;
    }

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    router.push('/');
  };

  // Custom validation to check if passwords match
  const validatePassword = (value: string) => {
    if (value === watch('password')) {
      return true;
    }
    return 'Die Passwörter stimmen nicht überein';
  };

  return (
    <main className="w-full flex items-center justify-center">
      <div className="p-8 mb-8 flex flex-col items-center justify-center shadow-none sm:shadow-xl rounded-[10px] w-full sm:w-5/6 md:w-3/4 lg:w-1/2 bg-white">
        <p className="text-2xl text-main-600 font-bold">Registrieren</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-6 w-full">
          <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr] gap-6">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="firstName" className=" text-main-900 text-xl font-semibold">
                Vorname
              </label>
              <input
                id="firstName"
                type="firstName"
                {...register('firstName', {
                  required: 'Vorname ist ein Pflichtfeld',
                })}
                className="border-none bg-main-200 rounded-none w-full text-xl p-3 focus:outline-none"
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="lastName" className=" text-main-900 text-xl font-semibold">
                Nachname
              </label>
              <input
                id="lastName"
                type="lastName"
                {...register('lastName', {
                  required: 'Nachname ist ein Pflichtfeld',
                })}
                className="border-none bg-main-200 rounded-none w-full text-xl p-3 focus:outline-none"
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-main-900 text-xl font-semibold">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              type="text"
              {...register('email', {
                required: 'E-Mail-Adresse ist ein Pflichtfeld',
              })}
              className="border-none bg-main-200 rounded-none w-full text-xl p-3 focus:outline-none"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-6">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password" className=" text-main-900 text-xl font-semibold">
                Passwort
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Passwort ist ein Pflichtfeld',
                })}
                className="border-none bg-main-200 rounded-none w-full text-xl p-3 focus:outline-none"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
              <p className="text-sm mt-2 text-main-500">Mindestens acht Zeichen</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="passwordConfirm" className=" text-main-900 text-xl font-semibold">
                Passwort wiederholen
              </label>
              <input
                id="passwordConfirm"
                type="password"
                {...register('passwordConfirm', {
                  required: 'Bitte wiederholen Sie Ihr Passwort',
                  validate: validatePassword,
                })}
                className="border-none bg-main-200 rounded-none w-full text-xl p-3 focus:outline-none"
              />
              {errors.passwordConfirm && (
                <p className="mt-2 text-sm text-red-600">{errors.passwordConfirm.message}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-4">
            <Link href="/login" className="hover:underline text-sm font-semibold">
              Zurück zur Anmeldung?
            </Link>
            <button
              type="submit"
              className="rounded-full justify-center py-2.5 px-5 border border-transparent text-white bg-main-700 hover:bg-black font-semibold text-xl"
            >
              Registrieren
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
