import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility: convert HTML content to plain text, decoding common entities
export function htmlToPlainText(html: string, maxLength?: number): string {
  if (!html) return ""
  // Strip tags
  let text = html.replace(/<[^>]*>/g, "")
  // Decode common HTML entities and normalize whitespace
  text = text
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#8217;/gi, "'")
    .replace(/&#8220;/gi, '"')
    .replace(/&#8221;/gi, '"')
    .replace(/\s+/g, " ")
    .trim()

  if (typeof maxLength === "number" && maxLength > 0 && text.length > maxLength) {
    return text.slice(0, maxLength) + "..."
  }
  return text
}
