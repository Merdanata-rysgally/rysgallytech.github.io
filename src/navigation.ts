import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from '../i18n/request';

export const { Link, redirect, useRouter, usePathname } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});
