import type { MetaFunction } from '@remix-run/cloudflare';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';

import { generateCanonicalUrl } from '@/lib/utils';
import { GlobalPendingIndicator } from '@/components/global-pending-indicator';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  ThemeSwitcherSafeHTML,
  ThemeSwitcherScript,
} from '@/components/theme-switcher';

import './globals.css';

export const meta: MetaFunction = ({ error, location }) => {
  const defaultDescription =
    "UCF's Premier Collegiate Cyber Defense Club - Learn cybersecurity, compete in competitions, and join our thriving community of security enthusiasts.";

  if (error) {
    const status = isRouteErrorResponse(error) ? error.status : 500;
    const errorTitle = `${status} Error | Hack@UCF`;

    return [
      { title: errorTitle },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
      { name: 'googlebot', content: 'noindex,nofollow,noarchive' },
    ];
  }

  const title = 'Hack@UCF - UCF Collegiate Cyber Defense Club';

  return [
    { title },
    { name: 'description', content: defaultDescription },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    { name: 'robots', content: 'index,follow' },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Hack@UCF' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: defaultDescription },
    { property: 'og:url', content: `https://hackucf.org${location.pathname}` },
    { property: 'og:image', content: 'https://hackucf.org/membership3.webp' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Hack@UCF Logo' },

    // Legacy Twitter tags (still supported)
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@HackUCF' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: defaultDescription },
    { name: 'twitter:image', content: 'https://hackucf.org/membership3.webp' },
    { name: 'twitter:image:alt', content: 'Hack@UCF Logo' },

    // New X tags (for future-proofing)
    { name: 'x:card', content: 'summary' },
    { name: 'x:site', content: '@HackUCF' },
    { name: 'x:title', content: title },
    { name: 'x:description', content: defaultDescription },

    // Canonical URL
    generateCanonicalUrl(location.pathname),
  ];
};

function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeSwitcherSafeHTML lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="UCF's One and Only Collegiate Cyber Defense Club"
        />
        <Meta />
        <Links />
        <ThemeSwitcherScript />
      </head>
      <body>
        <GlobalPendingIndicator />
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </ThemeSwitcherSafeHTML>
  );
}

export default function Root() {
  return (
    <App>
      <Outlet />
    </App>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = 'An unexpected error occurred.';
  if (isRouteErrorResponse(error)) {
    status = error.status;
    switch (error.status) {
      case 404:
        message = 'This page does not exist yet.';
        break;
    }
  } else {
    console.error(error);
  }

  return (
    <App>
      <div className="min-h-[50vh] flex flex-col space-y-8 mt-26 items-center justify-center text-center">
        <h1 className="text-8xl font-bold text-primary">{status}</h1>
        <p className="text-xl text-white">{message}</p>
      </div>
    </App>
  );
}
