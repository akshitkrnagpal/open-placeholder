import { ImageResponseOptions } from 'next/server';

export const getFonts = async (): Promise<ImageResponseOptions['fonts']> => {
  const fontFamily = 'Geist';

  const fontData = await fetch(
    new URL('./fonts/geist/Geist-Regular.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return [
    {
      name: fontFamily,
      data: fontData,
      style: 'normal',
    },
  ];
};
