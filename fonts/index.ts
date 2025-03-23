type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontStyle = 'normal' | 'italic';
interface FontOptions {
  data: Buffer | ArrayBuffer;
  name: string;
  weight?: Weight;
  style?: FontStyle;
  lang?: string;
}

export const getFonts = async (): Promise<FontOptions[]> => {
  const fontFamily = 'Geist';

  const fontData = await fetch(
    new URL('./geist/Geist-Regular.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return [
    {
      name: fontFamily,
      data: fontData,
      style: 'normal',
    },
  ];
};
