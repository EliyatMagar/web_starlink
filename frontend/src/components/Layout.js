import HeroSection from './Hero';
import ServicesSection from './ServicesSection';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import BlogSection from './BlogSection';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <Testimonials />
      <BlogSection />
      <Footer />
    </div>
  );
}