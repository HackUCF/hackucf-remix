import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';

import { GlobalPendingIndicator } from '@/components/global-pending-indicator';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  ThemeSwitcherSafeHTML,
  ThemeSwitcherScript,
} from '@/components/theme-switcher';

import './globals.css';

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
