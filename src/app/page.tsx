import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';

const SectionSkeleton = ({ minHeight = '500px' }: { minHeight?: string }) => (
  <div
    style={{
      minHeight,
      background: '#060B16',
      width: '100%',
    }}
    aria-hidden="true"
  />
);

const ServicesStack = dynamic(() => import('@/components/ServicesStack'), {
  loading: () => <SectionSkeleton minHeight="600px" />,
});
const Vehicles = dynamic(() => import('@/components/Vehicles'), {
  loading: () => <SectionSkeleton minHeight="500px" />,
});
const Routes = dynamic(() => import('@/components/Routes'), {
  loading: () => <SectionSkeleton minHeight="500px" />,
});
const ClientMarquee = dynamic(() => import('@/components/ClientMarquee'), {
  loading: () => <SectionSkeleton minHeight="400px" />,
});
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), {
  loading: () => <SectionSkeleton minHeight="500px" />,
});
const Process = dynamic(() => import('@/components/Process'), {
  loading: () => <SectionSkeleton minHeight="400px" />,
});
const BusinessSolutions = dynamic(() => import('@/components/BusinessSolutions'), {
  loading: () => <SectionSkeleton minHeight="400px" />,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <SectionSkeleton minHeight="500px" />,
});
import CtaBand from '@/components/ui/CtaBand';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesStack />
      <Vehicles />
      <Routes />
      <ClientMarquee />
      <WhyChooseUs />
      <Process />
      <BusinessSolutions />
      <Contact />
      <CtaBand />
    </>
  );
}
