import Layout from '../components/layout/Layout';
import InfoSection from '../components/home/InfoSection';
import TestimonialSlider from '../components/home/Testimonial';
import Partness from '../components/home/Partness';
import Hero from '../components/Hero';
import Services from '../components/home/Services';
import useHome from '../hooks/useHome';

export default function Index() {
  const {
    title,
    subtitle,
    testimonialTitleOne,
    testimonialTitleTwo,
    setTitle,
    setSubtitle,
    setTestimonialTitleOne,
    setTestimonialTitleTwo,
  } = useHome();
  return (
    <Layout>
      <Hero
        title={title}
        subtitle={subtitle}
        testimonialTitleOne={testimonialTitleOne}
        testimonialTitleTwo={testimonialTitleTwo}
      />
      <InfoSection />
      <Services />
      <TestimonialSlider />
      <Partness />
    </Layout>
  );
}
