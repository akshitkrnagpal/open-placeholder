import { getPlaceholdOptions } from '@/utils/parser';
import { ImageResponse } from 'next/og';
import type { CSSProperties } from 'react';

type Params = Promise<{
  filename: string[];
}>;

type Pattern = 'grid' | 'dots' | 'stripes' | 'none';

const patterns = new Set<Pattern>(['grid', 'dots', 'stripes', 'none']);
const backgroundColor = '#EEE';
const foregroundColor = '#31343C';
const patternColor = 'rgba(49, 52, 60, 0.12)';

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

function getPattern(request: Request): Pattern {
  const pattern = new URL(request.url).searchParams.get('pattern');
  return patterns.has(pattern as Pattern) ? (pattern as Pattern) : 'none';
}

function getPatternStyle(pattern: Pattern): CSSProperties {
  switch (pattern) {
    case 'grid':
      return {
        backgroundImage: `linear-gradient(${patternColor} 1px, transparent 1px), linear-gradient(90deg, ${patternColor} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      };
    case 'dots':
      return {};
    case 'stripes':
      return {
        backgroundImage: `linear-gradient(135deg, ${patternColor} 12.5%, transparent 12.5%, transparent 50%, ${patternColor} 50%, ${patternColor} 62.5%, transparent 62.5%, transparent 100%)`,
        backgroundSize: '32px 32px',
      };
    case 'none':
    default:
      return {};
  }
}

function renderPatternLayer(pattern: Pattern, width: number, height: number) {
  if (pattern !== 'dots') {
    return null;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: 'absolute',
        inset: 0,
      }}
    >
      <defs>
        <pattern id='dots' width='40' height='40' patternUnits='userSpaceOnUse'>
          <circle cx='20' cy='20' r='1.5' fill={patternColor} />
        </pattern>
      </defs>
      <rect width={width} height={height} fill='url(#dots)' />
    </svg>
  );
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { filename } = await params;
  // Join the array segments back into a single string
  const fullPath = filename.join('/');
  const options = getPlaceholdOptions(fullPath);
  
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
  const pattern = getPattern(request);
  
  // Use cached font data
  const fontData = await getFontData();
  
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor,
          color: foregroundColor,
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
          ...getPatternStyle(pattern),
        }}
      >
        {renderPatternLayer(pattern, options.width, options.height)}
        <h1 
          style={{ 
            fontSize, 
            fontFamily: 'Geist',
            textAlign: 'center',
            wordBreak: 'break-word',
            margin: 0,
            position: 'relative',
          }}
        >
          {displayText}
        </h1>
      </div>
    ),
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
