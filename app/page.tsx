
import HeroBanner from "@/components/HeroBanner";
import MenuPreview from "@/components/MenuPreview";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import TourSlider from "@/components/TourSlider";
import Services from "@/components/Services";
import RestaurantPreview from "@/components/RestaurantPreview";

export default function Home() {
  return (
<>
  <NavBar />
  <div className="flex flex-col">
    <HeroBanner>
      <Services />
    </HeroBanner>
    <TourSlider />
    <RestaurantPreview />
    <Testimonials />
    <Footer />
  </div>
</>
  );
}
