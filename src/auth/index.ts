import NextAuth from 'next-auth';

import { credentialsProvider } from './providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credentialsProvider],
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === 'signIn' && user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});
