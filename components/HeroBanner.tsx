'use client';
import { useEffect, useState } from "react";
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
      className="w-full max-h-[90vh] md:max-h-[85vh] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex flex-col justify-center bg-cover bg-center relative transition-all duration-1000"
      style={{ backgroundImage: `url('${images[bgIndex]}')` }}
    >
      {/* Gradient just at the top of the image with gray-900 */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-transparent pointer-events-none transition-all duration-1000" />
      {/* Fixed bottom gradient: stronger at bottom, transparent at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent transition-all duration-1000" />
      <div className="relative z-10 flex flex-col items-center text-center text-white gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-2xl transition-opacity duration-700 mb-2 sm:mb-4 md:mb-6" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.7)' }}>
          Imperdible en
        </h1>

        {/* Restaurante más destacado */}
        <div className="w-full flex justify-center flex-col items-center gap-2 sm:gap-3 md:gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-wide drop-shadow-lg transition-opacity duration-700 -mt-2 sm:-mt-3 md:-mt-4">
            San Rafael
          </h2>
          <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl mx-auto my-2 md:my-3">
            <div className="bg-emerald-50 rounded-lg md:rounded-xl shadow-xl flex flex-col md:flex-row items-center overflow-hidden">
              <div className="w-full md:w-1/2 h-48 sm:h-52 md:h-56 relative">
                <Image
                  src={restaurants[0].image}
                  alt={restaurants[0].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center md:items-start w-full md:w-1/2 space-y-3">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-700 leading-tight flex flex-col sm:flex-row items-center">
                  <span className="text-center sm:text-left">{restaurants[0].name}</span>
                  <span className="mt-2 sm:mt-0 sm:ml-3 px-3 py-1 text-xs bg-emerald-500 text-white rounded-full font-bold whitespace-nowrap">
                    Más destacado
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-gray-700 text-center md:text-left leading-relaxed max-w-xs sm:max-w-sm md:max-w-none">
                  {restaurants[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-4 md:mt-0">
          <div className="w-full flex justify-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}