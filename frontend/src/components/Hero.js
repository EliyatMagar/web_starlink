import Link from 'next/link';

export default function Hero({ title, subtitle, ctaText, ctaLink }) {
  return (
    <section className="bg-blue-50 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700">{title}</h1>
      <p className="mt-4 text-lg text-gray-700">{subtitle}</p>
      <Link 
        href={ctaLink} 
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {ctaText}
      </Link>
    </section>
  );
}
