import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/ContactForm';
import { ContactInfoPanel } from '@/components/ContactInfoPanel';
import { Footer } from '@/components/Footer';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <main>

      {/* ═══════════════════════════════════════════
          HERO — black bg, map underneath, text on top
          ═══════════════════════════════════════════ */}
      <section className="relative h-[92vh] min-h-[520px] bg-black overflow-hidden">

        {/* Map — fills the full hero */ }
        <iframe
          title="Rysgally Technology location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92617.43937059424!2d58.3182099!3d37.9519397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6fffd89e6f9109%3A0xd72f2a2adf34efb5!2sAshgabat%2C%20Turkmenistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
          className="absolute inset-0 w-full h-full"
          style={ {
            border: 0,
            filter: 'invert(0.88) hue-rotate(180deg) brightness(0.75) saturate(0.5)',
          } }
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Dark gradient veil — strong at top (navbar) and bottom (text) */ }
        <div
          aria-hidden
          className="absolute inset-0"
          style={ {
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.88) 100%)',
          } }
        />

        {/* Noise grain */ }
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={ {
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          } }
        />

        {/* Text — pinned to bottom-left of hero */ }
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8 pb-14 md:pb-20">
            <span
              className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest
                         border border-[#3fbad2]/40 text-[#3fbad2]"
              style={ { textShadow: '0 1px 8px rgba(0,0,0,0.8)' } }
            >
              { t('badge') }
            </span>

            <h1
              className="font-black leading-[0.95] tracking-tighter text-white"
              style={ {
                fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                textShadow: '0 2px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.95)',
              } }
            >
              { t('heading') }
            </h1>

            <p
              className="mt-4 text-white/70 text-base max-w-xl leading-relaxed"
              style={ { textShadow: '0 1px 12px rgba(0,0,0,0.85)' } }
            >
              { t('subheading') }
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT SECTION — white bg, 2-column grid
          ═══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8 py-12 md:py-16">

          {/* Section label */ }
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3fbad2] mb-3">
            { t('badge') }
          </p>
          <h2
            className="font-black leading-[0.95] tracking-tighter text-gray-950 mb-12"
            style={ { fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' } }
          >
            { t('info.heading') }
          </h2>

          {/* Two-column grid */ }
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 xl:gap-16">

            {/* LEFT: form */ }
            <ContactForm />

            {/* RIGHT: info panel */ }
            <ContactInfoPanel />
          </div>
        </div>
      </section>

      <Footer />

    </main>
  );
}
