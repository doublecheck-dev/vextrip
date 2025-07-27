
import "@/styles/globals.css";

export const metadata = {
  title: "Swigo Inspired Restaurant",
  description: "Modern restaurant template with Tailwind CSS and Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 font-sans">
        {children}
      </body>
    </html>
  );
}
