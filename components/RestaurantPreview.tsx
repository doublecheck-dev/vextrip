import Image from "next/image";

const restaurants = [
  {
    name: "Café San Rafael",
    description: "Ambiente acogedor y café de especialidad.",
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

export default function RestaurantPreview() {
  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
        Restaurantes y Hoteles Destacados
      </h2>
      <div className="flex flex-col gap-8 items-center w-full">
        <div className="flex flex-wrap gap-8 justify-center w-full">
          {restaurants.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-xs flex flex-col items-center transition-transform hover:scale-105 focus-within:scale-105 cursor-pointer"
              tabIndex={0}
              aria-label={r.name}
            >
              <div className="w-full h-48 relative">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority={i === 0}
                />
              </div>
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{r.name}</h3>
                <p className="text-gray-600 text-center">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
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
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">
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
        <div className="mt-8 text-center w-full">
          <a
            href="/restaurants"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver todos los restaurantes
          </a>
        </div>
      </div>
    </section>
  );
}