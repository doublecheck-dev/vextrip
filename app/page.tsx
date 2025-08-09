import HeroBanner from "@/components/HeroBanner";
import Testimonials from "@/components/Testimonials";
import TourSlider from "@/components/TourSlider";
import Services from "@/components/Services";
import RestaurantPreview from "@/components/RestaurantPreview";
import WhatsAppQR from "@/components/WhatsAppQR";

export default function Home() {
  return (
    <>
      <HeroBanner>
        <Services />
      </HeroBanner>
      <TourSlider />
      <RestaurantPreview />
      <Testimonials />
      
      {/* WhatsApp QR Component */}
      <WhatsAppQR 
        phoneNumber="+57 312 685-3970"
        message="Hola! Me interesa conocer más sobre los tours y servicios turísticos en San Rafael. ¿Podrían brindarme más información?"
        businessName="TourEx San Rafael"
      />
    </>
  );
}