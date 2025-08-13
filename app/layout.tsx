import './globals.css';
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
    metadataBase: new URL('https://openplaceholder.com'),
    openGraph: {
      title: name,
      description,
      type: 'website',
      images: ['/800x400/Open%20Placeholder'],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: ['/800x400/Open%20Placeholder'],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className={`${geist.className} font-sans`}>{children}</body>
    </html>
  );
}
