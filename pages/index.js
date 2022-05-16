import Layout from '../components/layout/Layout';
import InfoSection from '../components/home/InfoSection';
import OurPrices from '../components/home/OurPrices';
import TestimonialSlider from '../components/home/Testimonial';
import Partness from '../components/home/Partness';
import Hero from '../components/Hero';
import Services from '../components/home/Services';

export default function Index() {
  return (
    <Layout>
      <Hero />
      <InfoSection />
      <Services />
      <TestimonialSlider />
      <Partness />
    </Layout>
  );
}
