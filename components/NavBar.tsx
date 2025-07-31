'use client';
import { useState, useEffect } from 'react';
import { User, LogOut, TestTube } from 'lucide-react';
import LoginModal from './LoginModal';
import UserProfile from './UserProfile';
import { AuthService } from '@/lib/auth';
import { seedTestUsers, logAllUsers, exposeToWindow } from '@/lib/seed-data';

interface UserData {
  id: number;
  name: string;
  email: string;
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for logged in user on component mount and seed test data
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      try {
        // Seed test users on first load
        await seedTestUsers();
        
        // Check user session
        await checkUserSession();
        
        // Expose functions to window for manual testing
        exposeToWindow();
        
        // Expose mock login function
        (window as any).mockLogin = mockLogin;
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeApp();
  }, []);

  // Mock login function for testing
  const mockLogin = async () => {
    try {
      console.log('🧪 Mocking user login for testing...');
      
      // Create a simple mock user without database dependency
      const mockUserData = {
        id: 1,
        name: "María González",
        email: "maria.gonzalez@email.com"
      };
      
      // Generate a simple session ID
      const sessionId = `mock_session_${Date.now()}`;
      
      // Set local storage
      localStorage.setItem('tourex_session', sessionId);
      localStorage.setItem('tourex_user', JSON.stringify(mockUserData));

      // Update current user state immediately
      setCurrentUser(mockUserData);

      console.log('✅ Mock login successful!');
      console.log('👤 Logged in as:', mockUserData.name, '(' + mockUserData.email + ')');
      console.log('📱 Current user state:', mockUserData);
      console.log('💾 localStorage data:', {
        session: localStorage.getItem('tourex_session'),
        user: localStorage.getItem('tourex_user')
      });
      
      return mockUserData;
    } catch (error) {
      console.error('❌ Error in mock login:', error);
    }
  };

  const checkUserSession = async () => {
    try {
      const sessionId = localStorage.getItem('tourex_session');
      const userData = localStorage.getItem('tourex_user');
      
      console.log('🔍 Checking user session...');
      console.log('Session ID:', sessionId);
      console.log('User data:', userData);
      
      if (sessionId && userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          setCurrentUser(parsedUserData);
          console.log('✅ User logged in from localStorage:', parsedUserData);
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          // Clear invalid data
          localStorage.removeItem('tourex_session');
          localStorage.removeItem('tourex_user');
          setCurrentUser(null);
        }
      } else {
        console.log('ℹ️ No session found in localStorage');
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setCurrentUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('🚪 Logging out user...');
      
      localStorage.removeItem('tourex_session');
      localStorage.removeItem('tourex_user');
      setCurrentUser(null);
      setIsUserMenuOpen(false);
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    // Check for user session after modal closes and refresh user list
    setTimeout(async () => {
      await checkUserSession();
      await logAllUsers();
    }, 500);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsUserMenuOpen(false);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Debug current user state and localStorage
  useEffect(() => {
    console.log('🔄 Current user state changed:', currentUser);
    console.log('💾 localStorage session:', localStorage.getItem('tourex_session'));
    console.log('💾 localStorage user:', localStorage.getItem('tourex_user'));
  }, [currentUser]);

  return (
    <>
      <nav className="w-full px-6 sm:px-16 lg:px-12 xl:px-40 py-6 shadow-lg fixed bg-gray-900/95 backdrop-blur-sm z-50 flex justify-between items-center h-[6rem]">
        {/* Left Navigation Links */}
        <ul className="hidden lg:flex space-x-8 xl:space-x-10">
          <li>
            <a href="#menu" className="hover:text-emerald-400 text-white font-semibold transition-colors duration-200">
              Descubre
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-cyan-400 text-white font-semibold transition-colors duration-200">
              Reservas
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-rose-400 text-white font-semibold transition-colors duration-200">
              Gastronomia
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-orange-400 text-white font-semibold transition-colors duration-200">
              Ayuda
            </a>
          </li>
        </ul>

        {/* Logo - Centered */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 xl:w-10 xl:h-10 mr-2 xl:mr-3" />
          <h1 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            Tourex
          </h1>
        </div>

        {/* Search Bar & User/Login */}
        <div className="flex items-center space-x-4 xl:space-x-6">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar restaurantes, tours..."
              className="block w-64 xl:w-80 pl-10 pr-3 py-2 border border-gray-600 rounded-full bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Mobile Search Icon */}
          <button 
            className={`md:hidden text-white hover:text-orange-400 transition-colors duration-200 ${isMenuOpen ? 'hidden' : 'block'}`}
            onClick={mockLogin}
            title="Click to mock login (testing)"
          >
            <TestTube className="h-5 w-5" />
          </button>

          {/* User Profile or Login Button */}
          {isLoading ? (
            <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
          ) : currentUser ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className={`flex items-center gap-2 text-white hover:text-orange-400 transition-colors duration-200 ${isMenuOpen ? 'hidden lg:flex' : 'flex'}`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(currentUser.name)}
                </div>
                <span className="hidden xl:block font-medium">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {getInitials(currentUser.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{currentUser.name}</p>
                        <p className="text-sm text-gray-600">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={openProfileModal}
                      className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Mi Perfil
                    </button>
                    <button
                      onClick={mockLogin}
                      className="flex items-center gap-3 w-full px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <TestTube className="w-4 h-4" />
                      Mock Login (Test)
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={mockLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
                title="Mock Login (Testing)"
              >
                <TestTube className="w-4 h-4" />
              </button>
              <button
                onClick={openLoginModal}
                className={`bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${isMenuOpen ? 'hidden lg:block' : 'block'}`}
              >
                Login
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden text-white hover:text-orange-400 transition-colors duration-200"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMenu}>
          <div className="fixed top-[6rem] left-0 right-0 bg-gray-900/98 backdrop-blur-sm shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                <a 
                  href="#menu" 
                  className="block text-white hover:text-emerald-400 font-semibold transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  Descubre
                </a>
                <a 
                  href="#about" 
                  className="block text-white hover:text-cyan-400 font-semibold transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  Reservas
                </a>
                <a 
                  href="#contact" 
                  className="block text-white hover:text-rose-400 font-semibold transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  Gastronomia
                </a>
                <a 
                  href="#contact" 
                  className="block text-white hover:text-orange-400 font-semibold transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  Ayuda
                </a>
              </div>

              {/* Mobile Search Bar */}
              <div className="pt-4 border-t border-gray-700">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar restaurantes, tours..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-full bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Mobile User/Login Section */}
              <div className="pt-4">
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {getInitials(currentUser.name)}
                      </div>
                      <div>
                        <p className="font-semibold">{currentUser.name}</p>
                        <p className="text-sm text-gray-300">{currentUser.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-300 transition-colors py-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="block w-full text-center bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-200"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      
      {/* User Profile Modal */}
      <UserProfile isOpen={isProfileModalOpen} onClose={closeProfileModal} />
    </>
  );
}