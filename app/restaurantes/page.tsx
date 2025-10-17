'use client';
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import WhatsAppQR from "@/components/WhatsAppQR";
import { useEffect } from "react";
import { useState } from "react";
import RegisterRestaurantCTA from "@/components/atoms/RegisterRestaurantCTA";
import RegisterRestaurantModal from "@/components/organisms/RegisterRestaurantModal";
import { fetchRestaurants } from './supabaseClient';
import { normalizeList } from './utils';

type Restaurant = {
	// según backUp_database: id es integer
	id?: number;
	name?: string;
	description?: string | null;
	long_description?: string | null;
	image?: string | null;
	gallery?: string[] | null;
	rating?: number | string | null;
	reviews?: number | null;
	category?: string | null;
	cuisine?: string | null;
	location?: string | null; // legacy
	address?: string | null;
	city?: string | null;
	price_range?: string | null;
	phone?: string | null;
	email?: string | null;
	website?: string | null;
	open_hours?: string | null;
	featured?: boolean | null;
	amenities?: string[] | null;
	specialties?: string[] | null; // en backup es ARRAY
	reservation_required?: boolean | null;
	policies?: string[] | null;
	metadata?: any;
	lat?: number | null;
	lng?: number | null;
	[key: string]: any;
};

export default function RestaurantesPage() {
	const [restaurantsData, setRestaurantsData] = useState<{ success: boolean; data: Restaurant[] }>( {
		success: false,
		data: []
	});
	const [showForm, setShowForm] = useState<boolean>(false);

	useEffect(() => {
		// usar la función separada para obtener datos
		fetchRestaurants()
			.then((data) => setRestaurantsData({ success: true, data }))
			.catch((err) => {
				console.error('Error fetching restaurants from Supabase:', err);
				setRestaurantsData({ success: false, data: [] });
			});
	}, []);

	const featuredRestaurants =
		restaurantsData?.data?.filter((restaurant) => restaurant?.featured)
	const regularRestaurants = 
		restaurantsData?.data?.filter((restaurant) => !restaurant?.featured)

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-16 sm:py-20 md:py-24">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative max-w-7xl mx-auto text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6">
						Restaurantes de San Rafael
					</h1>
					<p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
						Descubre los mejores sabores de la región en una experiencia
						gastronómica única
					</p>
					<div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
						<span className="bg-white/20 px-4 py-2 rounded-full">
							🍽️ Cocina Gourmet
						</span>
						<span className="bg-white/20 px-4 py-2 rounded-full">
							🥩 Parrillas Tradicionales
						</span>
						<span className="bg-white/20 px-4 py-2 rounded-full">
							🌿 Ingredientes Locales
						</span>
						<span className="bg-white/20 px-4 py-2 rounded-full">
							⭐ Calidad Premium
						</span>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-12">
				{/* Featured Restaurants */}
				{featuredRestaurants.length > 0 && (
					<section className="mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
							🌟 Restaurantes Destacados
						</h2>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{featuredRestaurants.map((restaurant) => (
								<div
									key={restaurant.id}
									className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-200"
								>
									<div className="relative h-64 md:h-80">
										<Image
											src={restaurant.image ?? '/images/placeholder-restaurant.jpg'}
											alt={restaurant.name ?? 'Restaurant'}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
										<div className="absolute top-4 left-4">
											<span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
												⭐ Destacado
											</span>
										</div>
										<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
											<span className="text-orange-600 font-bold">
												{restaurant.price_range}
											</span>
										</div>
									</div>

									<div className="p-6">
										<div className="flex justify-between items-start mb-3">
											<h3 className="text-2xl font-bold text-gray-800">
												{restaurant.name}
											</h3>
											<div className="flex items-center gap-1">
												<Star className="w-5 h-5 text-yellow-400 fill-current" />
												<span className="font-semibold text-gray-700">
													{restaurant.rating}
												</span>
												<span className="text-gray-500">
													({restaurant.reviews})
												</span>
											</div>
										</div>

										<p className="text-gray-600 mb-4 leading-relaxed">
											{restaurant.long_description ?? restaurant.description}
										</p>

										<div className="space-y-3 mb-4">
											<div className="flex items-center gap-2 text-gray-700">
												<MapPin className="w-4 h-4 text-orange-500" />
												<span className="text-sm">
													{restaurant.address ?? restaurant.location ?? restaurant.city}
												</span>
											</div>
											<div className="flex items-center gap-2 text-gray-700">
												<Clock className="w-4 h-4 text-orange-500" />
												<span className="text-sm">
													{restaurant.open_hours}
												</span>
											</div>
											<div className="flex items-center gap-2 text-gray-700">
												<Phone className="w-4 h-4 text-orange-500" />
												<span className="text-sm">
													{restaurant.phone}
												</span>
											</div>
										</div>

										<div className="mb-4">
											<span className="text-sm font-semibold text-gray-700 mb-2 block">
												Especialidades:
											</span>
											<div className="flex flex-wrap gap-2">
												{normalizeList(restaurant.specialties).map((specialty, idx) => (
													<span
														key={idx}
														className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs"
													>
														{specialty}
													</span>
												))}
											</div>
										</div>

										<div className="flex justify-between items-center">
											<span className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
												{restaurant.cuisine}
											</span>
											<Link
												href={`/restaurantes/${restaurant.id}`}
												className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors duration-300"
											>
												Ver Más{" "}
												<ExternalLink className="w-4 h-4" />
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Regular Restaurants */}
				<section>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
						Todos los Restaurantes
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
						{regularRestaurants.map((restaurant) => (
							<div
								key={restaurant.id}
								className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
							>
								<div className="relative h-48">
									<Image
										src={restaurant.image ?? '/images/placeholder-restaurant.jpg'}
										alt={restaurant.name ?? 'Restaurant'}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
									<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
										<span className="text-orange-600 font-bold text-sm">
											{restaurant.price_range}
										</span>
									</div>
								</div>

								<div className="p-5">
									<div className="flex justify-between items-start mb-2">
										<h3 className="text-xl font-bold text-gray-800">
											{restaurant.name}
										</h3>
										<div className="flex items-center gap-1">
											<Star className="w-4 h-4 text-yellow-400 fill-current" />
											<span className="font-semibold text-gray-700 text-sm">
												{restaurant.rating}
											</span>
										</div>
									</div>

									<p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
										{restaurant.long_description ?? restaurant.description}
									</p>

									<div className="space-y-2 mb-3">
										<div className="flex items-center gap-2 text-gray-600">
											<MapPin className="w-3 h-3 text-orange-500" />
											<span className="text-xs">
												{restaurant.address ?? restaurant.city}
											</span>
										</div>
										<div className="flex items-center gap-2 text-gray-600">
											<Clock className="w-3 h-3 text-orange-500" />
											<span className="text-xs">
												{restaurant.open_hours}
											</span>
										</div>
									</div>

									<div className="mb-3">
										<div className="flex flex-wrap gap-1">
											{normalizeList(restaurant.specialties)
												.slice(0, 2)
												.map((specialty, idx) => (
													<span
														key={idx}
														className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs"
													>
														{specialty}
													</span>
												))}
											{normalizeList(restaurant.specialties).length > 2 && (
												<span className="text-orange-500 text-xs">
													+{normalizeList(restaurant.specialties).length - 2} más
												</span>
											)}
										</div>
									</div>

									<div className="flex justify-between items-center">
										<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
											{restaurant.cuisine}
										</span>
										<Link
											href={`/restaurantes/${restaurant.id}`}
											className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors duration-300 text-sm"
										>
											Ver Más{" "}
											<ExternalLink className="w-3 h-3" />
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Call to Action */}
				<section className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
					<h2 className="text-2xl md:text-3xl font-bold mb-4">
						¿Tienes un restaurante en San Rafael?
					</h2>
					<p className="text-lg mb-6 opacity-90">
						Únete a nuestra plataforma y conecta con más clientes
					</p>
					<RegisterRestaurantCTA onClick={() => setShowForm(true)} />
					{showForm && (
						<RegisterRestaurantModal
							onClose={() => setShowForm(false)}
							onSuccess={() => {
								setShowForm(false);
								// Refresca la lista de restaurantes después de guardar
								fetch('/api/restaurants', {
									method: 'GET',
									headers: { 'Content-Type': 'application/json' }
								})
									.then(r => r.json())
									.then(data => setRestaurantsData(data));
							}}
						/>
					)}
				</section>
			</div>

			{/* WhatsApp QR Component */}
			<WhatsAppQR
				phoneNumber="+57 312 685-3970"
				message="Hola! Me interesa conocer más sobre los restaurantes recomendados en San Rafael. ¿Podrían brindarme información sobre opciones gastronómicas?"
				businessName="Gastronomía vextrip"
			/>
		</div>
	);
}
				