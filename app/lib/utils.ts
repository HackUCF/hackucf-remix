import { SITE_URL } from "../config.shared";

export function generateCanonicalUrl(pathname: string) {
  return {
    tagName: "link",
    rel: "canonical",
    href: `${SITE_URL}${pathname}`,
  };
}
