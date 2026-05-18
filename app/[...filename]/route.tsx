import { getPlaceholdOptions, type PlaceholderLayout } from '@/utils/parser';
import { ImageResponse } from 'next/og';

type Params = Promise<{
  filename: string[];
}>;

export const runtime = 'edge';

// Cache the font data to avoid repeated fetches
let fontCache: ArrayBuffer | null = null;

async function getFontData(): Promise<ArrayBuffer> {
  if (!fontCache) {
    fontCache = await fetch(
      new URL('../../fonts/geist/Geist-Regular.otf', import.meta.url)
    ).then((res) => res.arrayBuffer());
  }
  return fontCache as ArrayBuffer;
}

function renderPlaceholder({
  layout,
  displayText,
  dimensionsText,
  fontSize,
}: {
  layout?: PlaceholderLayout;
  displayText: string;
  dimensionsText: string;
  fontSize: number;
}) {
  const textStyles = {
    fontFamily: 'Geist',
    wordBreak: 'break-word' as const,
    margin: 0,
  };

  switch (layout) {
    case 'hero':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#111827',
            color: '#FFFFFF',
            padding: '56px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '-12%',
              top: '-25%',
              width: '50%',
              height: '150%',
              backgroundColor: '#374151',
              transform: 'rotate(12deg)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '70%' }}>
            <div style={{ display: 'flex', fontSize: Math.max(fontSize * 0.22, 18), opacity: 0.72 }}>
              {dimensionsText}
            </div>
            <h1 style={{ ...textStyles, fontSize, lineHeight: 1.05 }}>{displayText}</h1>
          </div>
        </div>
      );
    case 'badge':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#F8FAFC',
            color: '#111827',
            padding: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
              padding: '28px 48px',
              border: '6px solid #111827',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <h1 style={{ ...textStyles, fontSize: fontSize * 0.74, textAlign: 'center' }}>{displayText}</h1>
            <div style={{ display: 'flex', fontSize: Math.max(fontSize * 0.18, 14), color: '#6B7280' }}>
              {dimensionsText}
            </div>
          </div>
        </div>
      );
    case 'split':
      return (
        <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#E5E7EB' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '58%',
              height: '100%',
              backgroundColor: '#31343C',
              color: '#FFFFFF',
              padding: '48px',
            }}
          >
            <h1 style={{ ...textStyles, fontSize: fontSize * 0.82, lineHeight: 1.1 }}>{displayText}</h1>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42%',
              height: '100%',
              color: '#31343C',
              padding: '32px',
            }}
          >
            <div style={{ display: 'flex', fontSize: Math.max(fontSize * 0.3, 18), textAlign: 'center' }}>
              {dimensionsText}
            </div>
          </div>
        </div>
      );
    case 'poster':
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            backgroundColor: '#F3F4F6',
            color: '#111827',
            padding: '44px',
          }}
        >
          <div style={{ display: 'flex', width: '100%', height: '12px', backgroundColor: '#111827' }} />
          <h1 style={{ ...textStyles, fontSize: fontSize * 0.9, lineHeight: 1.05, textAlign: 'center' }}>
            {displayText}
          </h1>
          <div style={{ display: 'flex', fontSize: Math.max(fontSize * 0.22, 16), color: '#6B7280' }}>
            {dimensionsText}
          </div>
        </div>
      );
    default:
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#EEE',
            color: '#31343C',
            padding: '20px',
          }}
        >
          <h1
            style={{
              fontSize,
              fontFamily: 'Geist',
              textAlign: 'center',
              wordBreak: 'break-word',
              margin: 0,
            }}
          >
            {displayText}
          </h1>
        </div>
      );
  }
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { filename } = await params;
  // Join the array segments back into a single string
  const fullPath = filename.join('/');
  const layout = new URL(request.url).searchParams.get('layout');
  const options = getPlaceholdOptions(fullPath, layout);
  
  // Return 404 if the URL is invalid
  if (!options) {
    return new Response('Not Found', { status: 404 });
  }
  
  // Calculate font size based on text length and image dimensions
  const displayText = options.text || `${options.width} x ${options.height}`;
  const baseFontSize = Math.min(options.width, options.height) / 5;
  
  // Adjust font size for longer text
  const textLength = displayText.length;
  const fontSizeMultiplier = textLength > 20 ? 0.6 : textLength > 10 ? 0.8 : 1;
  const fontSize = baseFontSize * fontSizeMultiplier;
  const dimensionsText = `${options.width} x ${options.height}`;
  
  // Use cached font data
  const fontData = await getFontData();
  
  return new ImageResponse(
    renderPlaceholder({
      layout: options.layout,
      displayText,
      dimensionsText,
      fontSize,
    }),
    {
      width: options.width,
      height: options.height,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000',
      },
    }
  );
}
