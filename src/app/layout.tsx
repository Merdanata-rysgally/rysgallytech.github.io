import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CursorProvider } from '@/components/CursorContext';
import { MagneticCursor } from '@/components/MagneticCursor';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rysgally Tehnologiya - Integrated Engineering & Trading Solutions',
  description: 'Professional EPC, water treatment, furniture manufacturing, and more. One partner for all your engineering and trading needs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CursorProvider>
            <MagneticCursor />
            <ThemeToggle />
            {children}
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
