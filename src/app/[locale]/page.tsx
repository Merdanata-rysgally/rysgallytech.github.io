import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/StatsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
    </main>
  );
}
