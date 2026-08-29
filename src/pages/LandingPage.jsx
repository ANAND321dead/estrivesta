import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}