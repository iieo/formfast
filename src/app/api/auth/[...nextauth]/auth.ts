import { dbGetAuthenticatedUser } from '@/db/functions/user';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials === undefined) {
          return null;
        }

        const { email, password } = credentials;
        const user = await dbGetAuthenticatedUser(email, password);
        if (user !== undefined) {
          return { ...user, verified: false };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};
