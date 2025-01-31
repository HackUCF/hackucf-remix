# Hack@UCF Website

The official website for UCF's Collegiate Cyber Defense Club (Hack@UCF), built with modern web technologies to provide a fast, accessible, and maintainable platform for our cybersecurity community.

## Tech Stack

- **[Remix](https://remix.run/)** - Full stack web framework providing server-side rendering and optimal loading strategies
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Edge hosting platform for blazing fast global content delivery
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible UI components built on Radix UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Bun](https://bun.sh/)** - Fast all-in-one JavaScript runtime & package manager

## Key Features

- 🌙 Dark/Light theme switching with system preference detection
- 🎨 Modern, responsive design using shadcn/ui components
- 🚀 Edge-optimized performance via Cloudflare's global network
- 📱 Mobile-first approach with full responsive design
- 🔍 SEO optimized with meta tags and social media previews
- ♿ Accessibility-focused development using ARIA standards
- ⚡ Lightning-fast development environment using Bun

## Development

### Prerequisites

- Install [Bun](https://bun.sh/): 
```bash
curl -fsSL https://bun.sh/install | bash
```

### Setup

1. Clone the repository:
```bash
git clone https://github.com/HackUCF/website.git
cd website
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run typecheck` - Run TypeScript type checking

## Deployment

The site automatically deploys to Cloudflare Pages when changes are pushed to the main branch. Our deployment process:

1. Automatically builds using Bun
2. Deploys to Cloudflare's global edge network
3. Provides instant cache invalidation
4. Includes preview deployments for pull requests

## Project Structure

```
├── app/
│   ├── components/    # Reusable UI components
│   ├── lib/          # Utility functions and helpers
│   ├── routes/       # Application routes
│   └── styles/       # Global styles and Tailwind config
├── public/           # Static assets
└── tests/           # Test files
```

## Performance

- Server-side rendering for optimal loading performance
- Edge computing via Cloudflare Workers
- Automatic image optimization
- Efficient bundling with Remix
- Fast development environment with Bun

## Contributing

We welcome contributions from our community members! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your PR:
- Follows our code style
- Includes appropriate tests
- Updates documentation as needed

## About Hack@UCF

Hack@UCF is UCF's Premier Collegiate Cyber Defense Club. We focus on:
- Learning cybersecurity through hands-on experience
- Competing in national and regional competitions
- Building a thriving community of security enthusiasts
- Providing resources for students interested in cybersecurity

Visit us at [hackucf.org]
