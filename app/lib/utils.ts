import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { SITE_URL } from "../config.shared";

export function generateCanonicalUrl(pathname: string) {
  return {
    tagName: "link",
    rel: "canonical",
    href: `${SITE_URL}${pathname}`,
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
