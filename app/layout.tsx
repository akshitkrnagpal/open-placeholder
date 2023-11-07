import './globals.css';
import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';

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
    <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className='font-sans'>{children}</body>
    </html>
  );
}
