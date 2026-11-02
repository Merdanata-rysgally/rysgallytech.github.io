import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/HeroSection';
import { ServiceTicker } from '@/components/ServiceTicker';
import { CompanyIntro } from '@/components/CompanyIntro';
import { Footer } from '@/components/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServiceTicker />
      <CompanyIntro />
      <Footer />
    </main>
  );
}
