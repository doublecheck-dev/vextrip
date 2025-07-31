import { Hotel, Utensils, Camera, PartyPopper, MapPinned } from "lucide-react";

export default function Services() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="w-full text-center text-xl md:text-2xl font-bold text-white-900   rounded-xl px-4 shadow">
        Elige tu experiencia
      </h1>
      <div className="w-full flex justify-center md:translate-y-[10%] translate-y-[10%] bottom-0 left-0 right-0 z-50">
        <div className="backdrop-blur-xl rounded-2xl shadow-2xl px-2 py-6 md:px-4 md:py-8 flex flex-wrap gap-4 md:gap-8 items-center justify-center max-w-full md:max-w-5xl border border-neutral-200">
          {[
            { icon: <Hotel className="w-8 h-8 md:w-10 md:h-10 text-[#22c55e]" />, bg: "bg-[#22c55e]/20", label: "Hoteles", labelColor: "text-[#22c55e]", href: "/hoteles" },
            { icon: <Utensils className="w-8 h-8 md:w-10 md:h-10 text-[#f59e42]" />, bg: "bg-[#f59e42]/20", label: "Restaurantes", labelColor: "text-[#f59e42]", href: "/restaurantes" },
            { icon: <Camera className="w-8 h-8 md:w-10 md:h-10 text-[#38bdf8]" />, bg: "bg-[#38bdf8]/20", label: "Lugares Turísticos", labelColor: "text-[#38bdf8]", href: "/lugares" },
            { icon: <PartyPopper className="w-8 h-8 md:w-10 md:h-10 text-[#e879f9]" />, bg: "bg-[#e879f9]/20", label: "Experiencias", labelColor: "text-[#e879f9]", href: "/experiencias" },
            { icon: <MapPinned className="w-8 h-8 md:w-10 md:h-10 text-[#a78bfa]" />, bg: "bg-[#a78bfa]/20", label: "Guías Turísticos", labelColor: "text-[#a78bfa]", href: "/guias" },
          ].map((service, i) => (
            <a
              key={i}
              href={service.href}
              className="flex flex-col items-center mx-1 md:mx-2 group min-w-[80px] md:min-w-[110px] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow"
              tabIndex={0}
              aria-label={service.label}
            >
              <div className="flex flex-col items-center transition-transform duration-300 group-hover:scale-[1.15] md:group-hover:scale-[1.25] group-active:scale-110">
                <span className={`inline-block p-4 md:p-7 rounded-full shadow-lg transition-transform duration-300 group-hover:rotate-6 ${service.bg}`}>
                  {service.icon}
                </span>
                <span className={`mt-2 md:mt-3 text-sm md:text-lg font-semibold ${service.labelColor} group-hover:brightness-125 transition-colors duration-300 drop-shadow`}>
                  {service.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}