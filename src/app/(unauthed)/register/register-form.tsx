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

    return (
        <main className="w-full flex items-center justify-center bg-main-900 py-12 px-4">
            <div className="p-8 max-w-md flex flex-col shadow-xl rounded-lg w-full bg-main-800 border border-main-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl text-indigo-400 font-bold mb-2">Registrieren</h1>
                    <p className="text-gray-400">Erstellen Sie ein neues Konto</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="firstName" className="text-gray-300 text-base font-medium">
                                Vorname
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Max"
                                {...register('firstName', {
                                    required: 'Vorname ist erforderlich',
                                })}
                                className="border border-main-600 bg-main-700 rounded-md w-full p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="lastName" className="text-gray-300 text-base font-medium">
                                Nachname
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Mustermann"
                                {...register('lastName', {
                                    required: 'Nachname ist erforderlich',
                                })}
                                className="border border-main-600 bg-main-700 rounded-md w-full p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="text-gray-300 text-base font-medium">
                            E-Mail-Adresse
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="beispiel@email.com"
                            {...register('email', {
                                required: 'E-Mail-Adresse ist erforderlich',
                            })}
                            className="border border-main-600 bg-main-700 rounded-md w-full p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="password" className="text-gray-300 text-base font-medium">
                            Passwort
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Passwort ist erforderlich',
                                minLength: {
                                    value: 4,
                                    message: 'Passwort muss mindestens 4 Zeichen lang sein',
                                },
                            })}
                            className="border border-main-600 bg-main-700 rounded-md w-full p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="mt-2 py-3 px-5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-base transition-colors shadow-md flex justify-center items-center"
                    >
                        Konto erstellen
                    </button>

                    <div className="text-center mt-2">
                        <p className="text-gray-400">
                            Bereits registriert?{' '}
                            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                                Anmelden
                            </Link>
                        </p>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-main-700">
                    <p className="text-sm text-gray-500 text-center">
                        Durch die Registrierung stimmen Sie unseren{' '}
                        <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">
                            Nutzungsbedingungen
                        </Link>{' '}
                        und{' '}
                        <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">
                            Datenschutzrichtlinien
                        </Link>{' '}
                        zu.
                    </p>
                </div>
            </div>
        </main>
    );
}