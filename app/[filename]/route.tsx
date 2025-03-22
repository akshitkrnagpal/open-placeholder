import { getFonts } from '@/fonts';
import { getPlaceholdOptions } from '@/utils/parser';
import { ImageResponse } from 'next/og';

type Params = {
  filename: string;
};

export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: Params }) {
  const options = getPlaceholdOptions(params.filename);
  const fontSize = Math.min(options.width, options.height) / 5;
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#EEE',
          color: '#31343C',
        }}
      >
        <h1 style={{ fontSize, fontFamily: 'Geist' }}>
          {options.width} x {options.height}
        </h1>
      </div>
    ),
    {
      width: options.width,
      height: options.height,
      fonts: await getFonts(),
    }
  );
}
