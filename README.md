<p align="center">
  <a href="https://openplaceholder.com">
    <img src="https://openplaceholder.com/800x400/Open%20Placeholder" alt="Open Placeholder">
  </a>
  <h1 align="center">Open Placeholder</h1>
</p>

<p align="center">
  <strong>A fast, simple, and customizable placeholder image service</strong>
</p>

<p align="center">
  <a href="https://openplaceholder.com">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#usage">Usage</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#deployment">Deployment</a>
</p>

---

Open Placeholder is a high-performance placeholder image generator built with Next.js and Edge Runtime. It provides dynamic image generation with custom dimensions and text, perfect for mockups, prototypes, and development.

## ✨ Features

- 🚀 **Edge Runtime** - Lightning-fast image generation at the edge
- 📐 **Flexible Sizing** - Support for any dimensions up to 4000x4000 pixels
- 📝 **Custom Text** - Display custom text instead of dimensions
- 💾 **Smart Caching** - Optimized with CDN cache headers for performance
- 🎨 **Clean Design** - Minimalist aesthetic with Geist font
- 🔧 **Zero Configuration** - Works out of the box with sensible defaults
- 🌍 **Self-Hostable** - Deploy your own instance in seconds

## 🚀 Quick Start

### Basic Usage

Generate a 600x400 placeholder image:
```
https://openplaceholder.com/600x400
```

### Square Images

Create a 256x256 square image with a single dimension:
```
https://openplaceholder.com/256
```

### Custom Text

Display custom text instead of dimensions:
```
https://openplaceholder.com/600x300/Hello%20World
```

## 📖 API Reference

### URL Format

```
https://openplaceholder.com/[width]x[height]/[text]
```

### Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `width` | number | Image width in pixels (1-4000) | `600` |
| `height` | number | Image height in pixels (1-4000) | `400` |
| `text` | string | Optional custom text (URL encoded) | `Hello%20World` |

### Examples

#### Rectangle (600x400)
```html
<img src="https://openplaceholder.com/600x400" alt="Placeholder">
```

#### Square (512x512)
```html
<img src="https://openplaceholder.com/512" alt="Square placeholder">
```

#### Custom Text
```html
<img src="https://openplaceholder.com/800x200/Coming%20Soon" alt="Coming Soon">
```

#### Banner with Text
```html
<img src="https://openplaceholder.com/1200x400/Hero%20Banner" alt="Hero Banner">
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[@vercel/og](https://vercel.com/docs/functions/og-image-generation)** - Image generation
- **[Tailwind CSS](https://tailwindcss.com)** - Styling
- **[TypeScript](https://www.typescriptlang.org)** - Type safety
- **[Zod](https://zod.dev)** - Runtime validation

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Deploy your own instance with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fakshitkrnagpal%2Fopen-placeholder)

### Deploy to Diploi 

Launch Open Placeholder on Diploi in one click and get a live instance running in seconds.

[![launch with diploi button](https://diploi.com/launch-big.svg)](https://diploi.com/launch/akshitkrnagpal/open-placeholder)

Learn more on [Diploi](https://diploi.com/).

### Self-Hosting

1. Clone the repository:
```bash
git clone https://github.com/akshitkrnagpal/open-placeholder.git
cd open-placeholder
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Build for production:
```bash
npm run build
npm run start
```

### Environment Variables

No environment variables are required for basic functionality. The app works out of the box!

## 🏗️ Development

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Local Development

```bash
# Clone the repo
git clone https://github.com/akshitkrnagpal/open-placeholder.git
cd open-placeholder

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start

# Run linter
pnpm lint
```

### Project Structure

```
open-placeholder/
├── app/
│   ├── [...filename]/     # Catch-all route for image generation
│   │   └── route.tsx      # Image generation endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── utils/
│   ├── parser.ts          # URL parameter parsing
│   └── data.ts            # GitHub data fetching
├── fonts/
│   └── geist/             # Local font files for image generation
└── public/                # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by [placehold.co](https://placehold.co/)
- Built with [Vercel's Edge Runtime](https://vercel.com/docs/functions/edge-functions)
- Typography by [Geist Font](https://vercel.com/font)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/akshitkrnagpal/open-placeholder?style=social)
![GitHub forks](https://img.shields.io/github/forks/akshitkrnagpal/open-placeholder?style=social)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/akshitkrnagpal">Akshit Kr Nagpal</a>
</p>
