# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Open Placeholder is a web application that generates dynamic placeholder images, similar to placehold.co. Users can request images by specifying dimensions in the URL (e.g., `/600x400` or `/512`), and the app returns a generated placeholder image. It also supports custom text display (e.g., `/600x400/Hello%20World`).

## Essential Commands

```bash
# Development
npm run dev        # Start Next.js dev server on http://localhost:3000

# Build & Production
npm run build      # Build for production
npm run start      # Start production server

# Code Quality
npm run lint       # Run ESLint to check code quality
```

## Architecture & Key Components

### Core Image Generation Flow

1. **Dynamic Route Handler** (`app/[...filename]/route.tsx`)
   - Runs on Edge Runtime for optimal performance
   - Uses catch-all routing to handle paths with slashes
   - Accepts dynamic URL parameters like `/600x400`, `/512`, or `/600x400/Custom%20Text`
   - Uses `@vercel/og` to generate SVG-based images
   - Returns images with cache headers for CDN optimization

2. **URL Parameter Parsing** (`utils/parser.ts`)
   - Uses Zod schemas for type-safe parsing
   - Supports multiple formats:
     - Rectangle: `WxH` (e.g., `600x400`)
     - Square: `N` (e.g., `512` creates 512x512)
     - Custom text: `WxH/text` (e.g., `600x400/Hello%20World`)
   - Falls back to 600x400 for invalid dimensions
   - Size limits: 1-4000 pixels for width and height

3. **Font Loading** (Hybrid approach)
   - Layout uses Geist and Geist_Mono from `next/font/google` for optimal web performance
   - Image generation uses local `fonts/geist/Geist-Regular.otf` file to avoid external CDN fetches in Edge Runtime

### Frontend Architecture

- **Homepage** (`app/page.tsx`): Displays project info with GitHub stars count
- **Data Fetching** (`utils/data.ts`): Fetches GitHub repo metadata using Zod validation
- **Styling**: Tailwind CSS with Geist font family

## Important Technical Details

- **Runtime**: Edge Runtime for the image generation API route
- **Image Generation**: Uses `@vercel/og` (formerly `next/server`) for SVG-based image generation
- **Type Safety**: Zod schemas validate all external data (URL params, API responses)
- **Font Loading**: Hybrid approach - `next/font/google` for app layout, local OTF file for image generation
- **URL Pattern**: The `[...filename]` catch-all segment captures all path parameters including slashes

## Development Workflow

When modifying the image generation:
1. The main logic is in `app/[...filename]/route.tsx`
2. URL parsing logic is separated in `utils/parser.ts`
3. Test changes by visiting URLs like:
   - `http://localhost:3000/800x600` (dimensions only)
   - `http://localhost:3000/512` (square format)
   - `http://localhost:3000/600x400/Hello%20World` (custom text)

When updating the homepage:
1. Homepage component is in `app/page.tsx`
2. GitHub data fetching is in `utils/data.ts`
3. The app fetches fresh GitHub stats on each request