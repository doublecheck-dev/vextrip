'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useRef } from 'react';

const places = [
  {
    title: 'Santorini, Greece',
    description: 'Enjoy white-washed buildings and stunning sunsets.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Kyoto, Japan',
    description: 'Ancient temples and cherry blossoms await.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Machu Picchu, Peru',
    description: 'Discover the Lost City of the Incas.',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Paris, France',
    description: 'Experience the romance and charm of Paris.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'New York, USA',
    description: 'The city that never sleeps awaits you.',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sydney, Australia',
    description: 'Visit the iconic Opera House and beautiful beaches.',
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80',
  },
];

export default function TourSlider() {
  const swiperRef = useRef(null);

  // Modern gradient colors for each slide
  const gradients = [
    "from-emerald-700 via-emerald-400 to-transparent",
    "from-cyan-700 via-cyan-400 to-transparent",
    "from-violet-700 via-violet-400 to-transparent",
    "from-amber-700 via-amber-400 to-transparent",
    "from-rose-700 via-rose-400 to-transparent",
    "from-sky-700 via-sky-400 to-transparent",
  ];

 return (
    <section className="relative pb-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 bg-gradient-to-br from-sky-50 via-emerald-50 to-rose-50">
      <div className="text-center mb-6 sm:mb-8 md:mb-10 pt-8 sm:pt-12 md:pt-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700">Explore Touristic Places</h2>
      </div>
      <div className="max-w-full md:max-w-5xl mx-auto relative px-2 md:px-0">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 1.8 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          spaceBetween={20}
          loop={true}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 80,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="w-full pb-12 sm:pb-16"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {Array(3).fill(places).flat().map((place, i) => (
            <SwiperSlide key={i} className="pb-4">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col relative transform transition-transform duration-300 hover:scale-105">
                <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Modern gradient at the bottom */}
                  <div className={`absolute bottom-0 left-0 w-full h-16 sm:h-20 md:h-28 lg:h-32 bg-gradient-to-t ${gradients[i % gradients.length]} scale-110`} />
                  {/* Title and description at the bottom over the gradient */}
                  <div className="absolute bottom-0 left-0 w-full px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 z-10">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white drop-shadow-lg mb-1 sm:mb-2">{place.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-200 drop-shadow-md leading-tight">{place.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Arrow buttons with modern colors */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-1 sm:left-2 md:left-0 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 sm:p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
          aria-label="Anterior"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-1 sm:right-2 md:right-0 transform -translate-y-1/2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-2 sm:p-3 shadow-xl transition-all duration-300 hover:scale-110 z-20"
          aria-label="Siguiente"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}