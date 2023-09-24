import './globals.css';
import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';

const font = Josefin_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Placehold',
  description: 'Placehold NextJs Template using @vercel/og.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
