'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, UtensilsCrossed, ExternalLink, Phone, Clock } from "lucide-react";
import { hotels } from "@/lib/hotels-data";
import WhatsAppQR from "@/components/WhatsAppQR";

const getAmenityIcon = (amenity: string) => {
	switch (amenity.toLowerCase()) {
		case "wifi":
			return <Wifi className="w-4 h-4" />;
		case "parking":
			return <Car className="w-4 h-4" />;
		case "restaurant":
			return <UtensilsCrossed className="w-4 h-4" />;
		case "gym":
			return <Dumbbell className="w-4 h-4" />;
		case "spa":
			return <Coffee className="w-4 h-4" />;
		default:
			return <Coffee className="w-4 h-4" />;
	}
};

export default function HotelesPage() {
	const featuredHotels = hotels.filter((hotel) => hotel.featured);
	const regularHotels = hotels.filter((hotel) => !hotel.featured);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-16 sm:py-20 md:py-24">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative max-w-7xl mx-auto text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6">
						Hoteles en San Rafael
					</h1>
					<p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
						Encuentra el alojamiento perfecto para tu estadía en San Rafael
					</p>
					<div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
						<span className="bg-white/20 px-4 py-2 rounded-full">
							🏨 Hoteles de Lujo
						</span>
						<span className="bg-white/20 px-4 py-2 rounded-full">
							🏡 Posadas Familiares
						</span>
						<span className="bg-white/20 px-4 py-2 rounded-full">
							🌿 Eco Lodges
						</span>
						<span className="bg-white/20 px-4 py-2 rounded-full">
							⭐ Mejor Calidad-Precio
						</span>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-12">
				{/* Featured Hotels */}
				{featuredHotels.length > 0 && (
					<section className="mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
							🌟 Hoteles Destacados
						</h2>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{featuredHotels.map((hotel) => (
								<div
									key={hotel.id}
									className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200"
								>
									<div className="relative h-64 md:h-80">
										<Image
											src={hotel.image}
											alt={hotel.name}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
										<div className="absolute top-4 left-4">
											<span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
												⭐ Destacado
											</span>
										</div>
										<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
											<span className="text-green-600 font-bold">
												${hotel.pricePerNight}
											</span>
											<span className="text-gray-600 text-sm">
												/noche
											</span>
										</div>
									</div>

									<div className="p-6">
										<div className="flex justify-between items-start mb-3">
											<h3 className="text-2xl font-bold text-gray-800">
												{hotel.name}
											</h3>
											<div className="flex items-center gap-1">
												<Star className="w-5 h-5 text-yellow-400 fill-current" />
												<span className="font-semibold text-gray-700">
													{hotel.rating}
												</span>
												<span className="text-gray-500">
													({hotel.reviews})
												</span>
											</div>
										</div>

										<p className="text-gray-600 mb-4 leading-relaxed">
											{hotel.description}
										</p>

										<div className="space-y-3 mb-4">
											<div className="flex items-center gap-2 text-gray-700">
												<MapPin className="w-4 h-4 text-green-500" />
												<span className="text-sm">
													{hotel.location}
												</span>
											</div>
											<div className="flex items-center gap-2 text-gray-700">
												<Clock className="w-4 h-4 text-green-500" />
												<span className="text-sm">
													Check-in: {hotel.checkIn} | Check-out:{" "}
													{hotel.checkOut}
												</span>
											</div>
											<div className="flex items-center gap-2 text-gray-700">
												<Phone className="w-4 h-4 text-green-500" />
												<span className="text-sm">
													{hotel.phone}
												</span>
											</div>
										</div>

										<div className="mb-4">
											<span className="text-sm font-semibold text-gray-700 mb-2 block">
												Servicios:
											</span>
											<div className="flex flex-wrap gap-2">
												{hotel.amenities
													.slice(0, 6)
													.map((amenity, idx) => (
														<span
															key={idx}
															className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
														>
															{getAmenityIcon(amenity)}
															{amenity}
														</span>
													))}
											</div>
										</div>

										<div className="mb-4">
											<span className="text-sm font-semibold text-gray-700 mb-2 block">
												Tipos de Habitación:
											</span>
											<div className="flex flex-wrap gap-1">
												{hotel.roomTypes.map((room, idx) => (
													<span
														key={idx}
														className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
													>
														{typeof room === 'string' ? room : room.name}
													</span>
												))}
											</div>
										</div>

										<div className="flex justify-between items-center">
											<span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
												{hotel.category}
											</span>
											<Link
												href={`/hoteles/${hotel.id}`}
												className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors duration-300"
											>
												Ver detalles{" "}
												<ExternalLink className="w-4 h-4" />
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Regular Hotels */}
				<section>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
						Todos los Hoteles
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
						{regularHotels.map((hotel) => (
							<div
								key={hotel.id}
								className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
							>
								<div className="relative h-48">
									<Image
										src={hotel.image}
										alt={hotel.name}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
									<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
										<span className="text-green-600 font-bold text-sm">
											${hotel.pricePerNight}
										</span>
										<span className="text-gray-600 text-xs">
											/noche
										</span>
									</div>
								</div>

								<div className="p-5">
									<div className="flex justify-between items-start mb-2">
										<h3 className="text-xl font-bold text-gray-800">
											{hotel.name}
										</h3>
										<div className="flex items-center gap-1">
											<Star className="w-4 h-4 text-yellow-400 fill-current" />
											<span className="font-semibold text-gray-700 text-sm">
												{hotel.rating}
											</span>
										</div>
									</div>

									<p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
										{hotel.description}
									</p>

									<div className="space-y-2 mb-3">
										<div className="flex items-center gap-2 text-gray-600">
											<MapPin className="w-3 h-3 text-green-500" />
											<span className="text-xs">
												{hotel.location}
											</span>
										</div>
										<div className="flex items-center gap-2 text-gray-600">
											<Clock className="w-3 h-3 text-green-500" />
											<span className="text-xs">
												Check-in: {hotel.checkIn}
											</span>
										</div>
									</div>

									<div className="mb-3">
										<div className="flex flex-wrap gap-1">
											{hotel.amenities
												.slice(0, 3)
												.map((amenity, idx) => (
													<span
														key={idx}
														className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs flex items-center gap-1"
													>
														{getAmenityIcon(amenity)}
														{amenity}
													</span>
												))}
											{hotel.amenities.length > 3 && (
												<span className="text-green-500 text-xs">
													+
													{hotel.amenities.length - 3} más
												</span>
											)}
										</div>
									</div>

									<div className="flex justify-between items-center">
										<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
											{hotel.category}
										</span>
										<Link
											href={`/hoteles/${hotel.id}`}
											className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm"
										>
											Ver detalles{" "}
											<ExternalLink className="w-3 h-3" />
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Call to Action */}
				<section className="mt-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-center text-white">
					<h2 className="text-2xl md:text-3xl font-bold mb-4">
						¿Tienes un hotel en San Rafael?
					</h2>
					<p className="text-lg mb-6 opacity-90">
						Únete a nuestra plataforma y aumenta tus reservas
					</p>
					<button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
						Registrar Hotel
					</button>
				</section>
			</div>

			{/* WhatsApp QR Component */}
			<WhatsAppQR 
				phoneNumber="+57 312 685-3970"
				message="Hola! Me interesa conocer las opciones de alojamiento en San Rafael. ¿Podrían brindarme información sobre hoteles y hospedajes disponibles?"
				businessName="Alojamiento TourEx"
			/>
		</div>
	);
}
