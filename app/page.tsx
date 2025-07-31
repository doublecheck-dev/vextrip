import HeroBanner from "@/components/HeroBanner";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import TourSlider from "@/components/TourSlider";
import Services from "@/components/Services";
import RestaurantPreview from "@/components/RestaurantPreview";
import WhatsAppQR from "@/components/WhatsAppQR";
import RootLayout from "./layout";

export default function Home() {
  return (
    <>
      <RootLayout>
        <HeroBanner>
          <Services />
        </HeroBanner>
        <TourSlider />
        <RestaurantPreview />
        <Testimonials />
        <Footer />
        
        {/* WhatsApp QR Component */}
        <WhatsAppQR 
          phoneNumber="+57 312 685-3970"
          message="Hola! Me interesa conocer más sobre los tours y servicios turísticos en San Rafael. ¿Podrían brindarme más información?"
          businessName="TourEx San Rafael"
        />
      </RootLayout>
    </>
  );
}
