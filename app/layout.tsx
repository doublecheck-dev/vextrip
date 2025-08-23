import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/styles/globals.css";

export const metadata = {
  title: "vextrip - Turismo en San Rafael",
  description: "Descubre los mejores hoteles, restaurantes, lugares turísticos y experiencias en San Rafael, Mendoza.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-800 font-sans">
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}