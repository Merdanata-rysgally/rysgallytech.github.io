import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
export const locales = ["en", "ru", "tk"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale;

  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`../src/messages/${locale}.json`)).default,
  };
});
