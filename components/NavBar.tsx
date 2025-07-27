export default function NavBar() {
  return (
    <nav className="w-full px-[200px] py-4 shadow-sm fixed bg-gray-900 z-50 flex justify-between items-center h-[5rem]">
      <ul className="hidden md:flex space-x-6">
        <li>
          <a href="#menu" className="hover:text-emerald-400 text-white font-semibold transition-colors duration-200">
            Menu
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-cyan-400 text-white font-semibold transition-colors duration-200">
            About
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-rose-400 text-white font-semibold transition-colors duration-200">
            Contact
          </a>
        </li>
      </ul>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">Swigo</h1>
      </div>
      <div className="ml-auto">
        <a
          href="#login"
          className="bg-white hover:bg-gray-700 text-gray-900 font-semibold px-4 py-2 rounded-full shadow transition-colors duration-200"
        >
          Login
        </a>
      </div>
    </nav>
  );
}