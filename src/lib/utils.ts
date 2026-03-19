import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Para formatla: 1234.5 -> "1.234,50 TL" */
export function formatPara(tutar: number): string {
  return (
    new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(tutar) + " TL"
  );
}

/** Slug olustur: "Tapu iptali ve tescil" -> "tapu-iptali-ve-tescil" */
export function slugify(text: string): string {
  const charMap: Record<string, string> = {
    "\u00e7": "c",
    "\u011f": "g",
    "\u0131": "i",
    "\u00f6": "o",
    "\u015f": "s",
    "\u00fc": "u",
    "\u00c7": "c",
    "\u011e": "g",
    "\u0130": "i",
    "\u00d6": "o",
    "\u015e": "s",
    "\u00dc": "u",
  };
  return text
    .split("")
    .map((ch) => charMap[ch] || ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
