import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';

const ServicesStack = dynamic(() => import('@/components/ServicesStack'), {
  loading: () => <div style={{ minHeight: '600px', background: 'var(--color-navy-950-alt)' }} />,
});
const Vehicles = dynamic(() => import('@/components/Vehicles'), {
  loading: () => <div style={{ minHeight: '500px', background: '#ffffff' }} />,
});
const Routes = dynamic(() => import('@/components/Routes'), {
  loading: () => <div style={{ minHeight: '500px', background: 'var(--color-navy-950)' }} />,
});
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), {
  loading: () => <div style={{ minHeight: '500px', background: '#ffffff' }} />,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div style={{ minHeight: '500px', background: 'var(--color-navy-950)' }} />,
});
const CtaBanner = dynamic(() => import('@/components/CtaBanner'));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesStack />
      <Vehicles />
      <Routes />
      <WhyChooseUs />
      <Contact />
      <CtaBanner />
    </>
  );
}
