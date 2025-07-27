'use client';
import { useEffect, useState } from "react";
import Services from "./Services";
import Image from "next/image";

// Add restaurant data here
const restaurants = [
  {
    name: "Hotel Magia Natural",
    description: "Descubre la magia de la naturaleza en cada rincón.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Bistro del Valle",
    description: "Cocina internacional y menú gourmet.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sabores Andinos",
    description: "Platos típicos y gastronomía local.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Hotel Magia Natural",
    description: "Descubre la magia de la naturaleza en cada rincón.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  }
];

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
];

export default function HeroBanner({ children }: { children: React.ReactNode }) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      className="w-full max-h-[70vh] md:max-h-[80vh] min-h-[400px] md:min-h-[600px] flex flex-col justify-center bg-cover bg-center relative transition-all duration-1000"
      style={{ backgroundImage: `url('${images[bgIndex]}')` }}
    >
      {/* Gradient just at the top of the image with gray-900 */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-transparent pointer-events-none transition-all duration-1000" />
      {/* Fixed bottom gradient: stronger at bottom, transparent at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent transition-all duration-1000" />
      <div className="relative z-10 flex flex-col items-center text-center text-white px-4 pt-16 md:pt-24">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 md:mb-4 drop-shadow-lg transition-opacity duration-700">
          San Rafael
        </h1>
        {/* Restaurante más destacado */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-2xl mx-auto my-12">
            <div className="bg-emerald-50 rounded-xl shadow-xl flex flex-col md:flex-row items-center overflow-hidden">
             
              <div className="w-full md:w-1/2 h-56 relative">
                <Image
                  src={restaurants[0].image}
                  alt={restaurants[0].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
              <div className="p-8 flex flex-col items-center md:items-start w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-emerald-700 mb-2 flex items-center">
                  {restaurants[0].name}
                  <span className="ml-2 px-2 py-1 text-xs bg-emerald-500 text-white rounded-full font-bold align-middle">
                    Más destacado
                  </span>
                </h3>
                <p className="text-gray-700 text-center md:text-left">{restaurants[0].description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">

          <div className="w-full flex justify-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}