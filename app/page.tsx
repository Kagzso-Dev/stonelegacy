import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import EngravingMethods from '@/components/sections/EngravingMethods';
import GraniteTypes from '@/components/sections/GraniteTypes';
import SizeOptions from '@/components/sections/SizeOptions';
import QualityLevels from '@/components/sections/QualityLevels';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FloatingButtons from '@/components/ui/FloatingButtons';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navbar />
      <Hero />
      <Services />
      <EngravingMethods />
      <GraniteTypes />
      <SizeOptions />
      <QualityLevels />
      <WhyChooseUs />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
