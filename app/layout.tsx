import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getGithubRepoData } from '@/utils/data';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export async function generateMetadata() {
  const { name, description } = await getGithubRepoData();
  return {
    title: name,
    description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${geist.variable} ${geistMono.variable}`}>
      <body className={`${geist.className} font-sans`}>{children}</body>
    </html>
  );
}
