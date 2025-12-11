# CHCI Frontend - Next.js Application

Modern frontend for CHCI website built with Next.js 14, React, and Tailwind CSS.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🔍 SEO optimized
- 🚀 Server-side rendering
- 🎯 TypeScript support
- 🔄 API integration

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── courses/           # Courses page
│   ├── faculty/           # Faculty page
│   ├── researchers/       # Researchers page
│   ├── staff/             # Staff page
│   ├── research/          # Research page
│   ├── blogs-media/       # Blogs & Media page
│   ├── infrastructure/    # Infrastructure page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Site header
│   │   └── Footer.tsx     # Site footer
│   └── home/             # Home page components
│       ├── Hero.tsx      # Hero section
│       ├── Objectives.tsx # Objectives section
│       └── AnnouncementTicker.tsx # Announcement ticker
│
├── lib/                   # Utilities
│   └── api.ts            # API client
│
└── public/               # Static files
    └── assets/           # Images, fonts, etc.
```

## Pages

- `/` - Home page
- `/about` - About Us
- `/contact` - Contact page
- `/research` - Research page
- `/courses` - Academic courses
- `/faculty` - Faculty members
- `/researchers` - Research scholars
- `/staff` - Staff members
- `/blogs-media` - Blogs and media
- `/infrastructure` - Infrastructure and facilities

## Components

### Layout Components

- `Header` - Site navigation header
- `Footer` - Site footer

### Home Components

- `Hero` - Hero section with rotating images
- `Objectives` - Objectives carousel
- `AnnouncementTicker` - Scrolling announcements

## API Integration

All API calls are handled through `lib/api.ts`:

```typescript
import { facultyApi } from '@/lib/api'

// Get all faculty
const response = await facultyApi.getAll()
```

## Styling

- Tailwind CSS for utility-first styling
- Custom CSS in `globals.css`
- Responsive design with mobile-first approach

## Image Optimization

Next.js Image component is used for optimized images:

```tsx
import Image from 'next/image'

<Image
  src="/assets/img/logo.png"
  alt="Logo"
  width={100}
  height={100}
/>
```

## SEO

Each page includes metadata:

```typescript
export const metadata: Metadata = {
  title: 'Page Title - CHCI',
  description: 'Page description',
}
```

## Development Tips

1. Use TypeScript for type safety
2. Follow Next.js App Router conventions
3. Use Tailwind CSS classes for styling
4. Keep components small and reusable
5. Use server components when possible
6. Client components for interactivity

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Other Platforms

```bash
npm run build
npm start
```

## Troubleshooting

**Images not loading:**
- Ensure assets are in `public/assets/`
- Check image paths
- Verify Next.js image configuration

**API errors:**
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running
- Check CORS settings

**Build errors:**
- Clear `.next` folder
- Reinstall dependencies
- Check TypeScript errors

