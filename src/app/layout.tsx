import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'FormFast',
    description: 'Erstelle deine eigenen Forms',
  };
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-[100dvh] w-[100dvw] overflow-hidden bg-main-900 flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
