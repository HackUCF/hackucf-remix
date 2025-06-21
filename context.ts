import type { AppLoadContext } from '@remix-run/cloudflare';

export interface Env {
  CLOUDFLARE_ANALYTICS_TOKEN?: string;
}

export function getLoadContext(env: Env): AppLoadContext {
  return {
    CLOUDFLARE_ANALYTICS_TOKEN: env.CLOUDFLARE_ANALYTICS_TOKEN,
  };
}
