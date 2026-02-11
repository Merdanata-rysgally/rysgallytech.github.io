import { HeroSection } from '@/components/HeroSection';
import { ServiceTicker } from '@/components/ServiceTicker';
import { CompanyIntro } from '@/components/CompanyIntro';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServiceTicker />
      <CompanyIntro />
      <Footer />
    </main>
  );
}
