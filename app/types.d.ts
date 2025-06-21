import '@remix-run/cloudflare';

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    CLOUDFLARE_ANALYTICS_TOKEN?: string;
  }
}
