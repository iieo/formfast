import { dbGetUserByEmailAndPassword } from '@/db/functions/user-auth';
import Credentials from 'next-auth/providers/credentials';

import { credentialsSchema } from './schema';

export const credentialsProvider = Credentials({
  id: 'credentials',
  name: 'credentials',
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    const { email, password } = credentialsSchema.parse(credentials);

    console.log('credentials');

    const maybeUser = await dbGetUserByEmailAndPassword({
      email,
      password,
    });

    if (maybeUser === undefined) {
      throw new Error('wrong credentials');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...obscuredUser } = maybeUser;

    return { ...obscuredUser, type: 'credentials' };
  },
});
