import Link from 'next/link';
export default function LanguageLanding() {
 return <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-8 text-center"><h1 className="text-4xl font-bold">Rysgally Tehnologiýa</h1><p>Türkmenistan · Engineering · Agriculture · Trade</p><nav aria-label="Language" className="flex flex-wrap justify-center gap-6 text-xl"><Link href="/tk/">Türkmençe</Link><Link href="/ru/">Русский</Link><Link href="/en/">English</Link></nav></main>;
}
