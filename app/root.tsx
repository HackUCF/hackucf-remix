import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
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
import { useAnalytics } from '@/hooks/use-analytics';

import './globals.css';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  return {
    analyticsToken: context.CLOUDFLARE_ANALYTICS_TOKEN || null,
  };
};

export const meta: MetaFunction = ({ error, location }) => {
  const title = 'Hack@UCF - UCF Collegiate Cyber Defense Club';
  const defaultDescription =
    'The University of Central Florida Premier Collegiate Cyber Defense Club - Learn cybersecurity fundamentals, compete in national competitions, network with industry professionals, and join our thriving community of security enthusiasts and researchers.';
  const imageUrl = 'https://hackucf.org/hackucf-opengraph-card.jpg';

  if (error) {
    return [
      { title: 'Error | Hack@UCF' },
      { name: 'robots', content: 'noindex,nofollow,noarchive' },
      { name: 'googlebot', content: 'noindex,nofollow,noarchive' },
    ];
  }

  return [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1,viewport-fit=cover' },
    { property: 'og:url', content: `https://hackucf.org${location.pathname}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: defaultDescription },
    { property: 'og:image', content: imageUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@HackUCF' },
    { name: 'twitter:creator', content: '@HackUCF' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: defaultDescription },
    { name: 'twitter:image', content: imageUrl },
    generateCanonicalUrl(location.pathname),
  ];
};

function App({ children }: { children: React.ReactNode }) {
  const { analyticsToken } = useLoaderData<typeof loader>();

  // Use analytics hook as fallback
  useAnalytics({ token: analyticsToken, enabled: true });

  return (
    <ThemeSwitcherSafeHTML lang="en">
      <head>
        <Meta />
        <Links />
        <ThemeSwitcherScript />
        {/* Cloudflare Web Analytics */}
        {analyticsToken && (
          <>
            <script
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={`{"token": "${analyticsToken}"}`}
              onError={() => console.error('Failed to load Cloudflare Analytics beacon')}
              onLoad={() => console.log('Cloudflare Analytics beacon loaded successfully')}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  console.log('Analytics token available:', '${analyticsToken}');
                  // Fallback for manual initialization if needed
                  window._cfSettings = window._cfSettings || {};
                  window._cfSettings.token = '${analyticsToken}';
                `,
              }}
            />
          </>
        )}
        {!analyticsToken && (
          <script
            dangerouslySetInnerHTML={{
              __html: `console.warn('Cloudflare Analytics token not found. Set CLOUDFLARE_ANALYTICS_TOKEN environment variable.');`,
            }}
          />
        )}
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
