// src/utils/helpers.ts

/**
 * Format section buttons numbers (e.g., sh-s01 -> 01, sh-s10a -> 10.A)
 */
export function getSectionNum(key: string): string {
  const code = key.replace('sh-s', '');
  if (/^\d+[a-zA-Z]$/.test(code)) {
    const match = code.match(/^\d+/);
    const digits = match ? match[0] : '';
    const letter = code.slice(digits.length).toUpperCase();
    return `${digits}.${letter}`;
  }
  return code;
}

/**
 * Strips prepended section ordering digits from text if present
 */
export function cleanTitle(title: string): string {
  if (!title) return '';
  return title.replace(/^(\d+\.?\w*\s*[-—:\.]\s*)/, '').trim();
}
