declare module 'next-auth' {
  interface User {
    email: string;
  }

  interface Session {
    user: { email: string };
    accessToken: string;
  }
}
