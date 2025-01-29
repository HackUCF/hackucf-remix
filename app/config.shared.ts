export const APP_NAME = 'remix-shadcn';

export const SITE_URL = 'https://hackucf.org';

export function title(pageTitle?: string) {
  if (!pageTitle) return APP_NAME;

  return `${pageTitle} | ${APP_NAME}`;
}
