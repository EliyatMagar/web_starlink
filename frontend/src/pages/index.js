// src/pages/index.js (Home page)
import Hero from '../components/Hero';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';

export default function Home() {
  return (
    <>
      <Hero 
        title="Your Path to Education Success"
        subtitle="Expert consultancy for students and institutions"
        ctaText="Explore Services"
        ctaLink="/services"
      />
      <ServicesSection/>
      <WhyChooseUs/>
      <Testimonials/>
      <BlogSection/>
    </>
  );
}
