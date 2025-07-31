import WhatsAppQR from "@/components/WhatsAppQR";

export default function AyudaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Centro de Ayuda
          </h1>
          <p className="text-xl md:text-2xl">
            Estamos aquí para ayudarte con cualquier consulta
          </p>
        </div>
      </div>

      {/* WhatsApp QR Component */}
      <WhatsAppQR 
        phoneNumber="+57 312 685-3970"
        message="Hola! Necesito ayuda con los servicios de TourEx. ¿Podrían asistirme con mi consulta?"
        businessName="Soporte TourEx"
      />
    </div>
  );
}
