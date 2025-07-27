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
    <section className="relative pb-8 pt-16 md:pb-16 md:pt-[7rem] bg-gradient-to-br from-sky-50 via-emerald-50 to-rose-50">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-700">Explore Touristic Places</h2>
      </div>
      <div className="max-w-full md:max-w-5xl mx-auto relative px-2 md:px-0">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="w-full"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {Array(3).fill(places).flat().map((place, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col relative">
                <div className="relative w-full h-60 sm:h-72 md:h-96 lg:h-[32rem]">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Modern gradient at the bottom */}
                  <div className={`absolute bottom-0 left-0 w-full h-20 sm:h-32 md:h-48 lg:h-60 bg-gradient-to-t ${gradients[i % gradients.length]} scale-110`} />
                  {/* Title and description at the bottom over the gradient */}
                  <div className="absolute bottom-0 left-0 w-full px-2 sm:px-4 pb-4 sm:pb-8 z-10">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white drop-shadow mb-1 sm:mb-2">{place.title}</h3>
                    <p className="text-xs sm:text-base md:text-lg text-gray-200 drop-shadow">{place.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Arrow buttons with modern colors */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-2 md:left-0 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 md:p-3 shadow-lg transition z-20"
          aria-label="Anterior"
        >
          &#8592;
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-2 md:right-0 transform -translate-y-1/2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-2 md:p-3 shadow-lg transition z-20"
          aria-label="Siguiente"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}