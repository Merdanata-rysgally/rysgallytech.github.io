import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "../i18n/request";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Don't show /tk in URL for default locale
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(tk|ru|en)/:path*", "/((?!_next|favicon.ico|images|svgs).*)"],
};
