import Image from "next/image";

interface RestaurantGalleryProps {
  gallery: string[];
  restaurantName: string;
}

export default function RestaurantGallery({ gallery, restaurantName }: RestaurantGalleryProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Galería</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {gallery.slice(1, 7).map((image, idx) => (
          <div key={idx} className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <Image
              src={image}
              alt={`${restaurantName} - Imagen ${idx + 2}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
