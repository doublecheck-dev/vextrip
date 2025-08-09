
import HeroBanner from "@/components/HeroBanner";
import Testimonials from "@/components/Testimonials";
import TourSlider from "@/components/TourSlider";
import Services from "@/components/Services";
import RestaurantPreview from "@/components/RestaurantPreview";

export default function Home() {
  return (
<>
  <div className="flex flex-col">
    <HeroBanner>
      <Services />
    </HeroBanner>
    <TourSlider />
    <RestaurantPreview />
    <Testimonials />
  </div>
</>
  );
}
