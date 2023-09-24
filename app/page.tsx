import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex flex-col items-center py-12 px-6 md:p-24 gap-8 min-h-screen bg-[#31343C]'>
      <h1 className='text-4xl md:text-8xl text-white'>Placehold</h1>
      <Image unoptimized src='/600x400' width={600} height={400} alt='' />
    </main>
  );
}
