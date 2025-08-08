import Layout from '../components/Layout';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <Layout>
      <Hero 
        title="Your Path to Education Success"
        subtitle="Expert consultancy for students and institutions"
        ctaText="Explore Services"
        ctaLink="/services"
      />
    </Layout>
  );
}
