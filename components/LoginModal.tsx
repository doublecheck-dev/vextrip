'use client';
import { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = (): boolean => {
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos obligatorios');
      return false;
    }

    if (!isLogin && !formData.name) {
      setError('Por favor, ingresa tu nombre completo');
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un email válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Login user - check localStorage
        const storedUsers = JSON.parse(localStorage.getItem('vextrip_users') || '[]');
        const user = storedUsers.find((u: any) => 
          u.email.toLowerCase() === formData.email.toLowerCase() && 
          u.password === formData.password
        );
        
        if (user) {
          // Create session
          const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          // Update last login
          user.lastLogin = new Date().toISOString();
          const updatedUsers = storedUsers.map((u: any) => u.id === user.id ? user : u);
          localStorage.setItem('vextrip_users', JSON.stringify(updatedUsers));
          
          // Set session data
          localStorage.setItem('vextrip_session', sessionId);
          localStorage.setItem('vextrip_user', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
          }));
          
          setSuccess('¡Bienvenido de vuelta!');
          console.log('✅ User logged in successfully:', user.email);
          
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1500);
        } else {
          setError('Email o contraseña incorrectos');
        }
      } else {
        // Register user - save to localStorage
        const storedUsers = JSON.parse(localStorage.getItem('vextrip_users') || '[]');
        
        // Check if user already exists
        const existingUser = storedUsers.find((u: any) => 
          u.email.toLowerCase() === formData.email.toLowerCase()
        );
        
        if (existingUser) {
          setError('Ya existe una cuenta con este email');
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now(),
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          provider: 'email',
          createdAt: new Date().toISOString(),
          lastLogin: null
        };
        
        // Save to localStorage
        storedUsers.push(newUser);
        localStorage.setItem('vextrip_users', JSON.stringify(storedUsers));
        
        setSuccess('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
        console.log('✅ User registered successfully:', newUser.email);
        console.log('📄 All users in localStorage:', storedUsers);
        
        setTimeout(() => {
          setIsLogin(true);
          resetForm();
          setSuccess('');
        }, 2000);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'tiktok' | 'instagram') => {
    setError('');
    setIsLoading(true);
    
    try {
      const mockEmail = `usuario.${provider}@${provider}.com`;
      const mockName = `Usuario ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
      
      const storedUsers = JSON.parse(localStorage.getItem('vextrip_users') || '[]');
      
      // Check if social user exists
      let user = storedUsers.find((u: any) => u.email === mockEmail);
      
      if (!user) {
        // Create new social user
        user = {
          id: Date.now(),
          name: mockName,
          email: mockEmail,
          password: `social-${provider}-${Math.random().toString(36)}`,
          provider: provider,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        storedUsers.push(user);
        localStorage.setItem('vextrip_users', JSON.stringify(storedUsers));
        console.log('✅ New social user created:', user);
      } else {
        // Update last login
        user.lastLogin = new Date().toISOString();
        const updatedUsers = storedUsers.map((u: any) => u.id === user.id ? user : u);
        localStorage.setItem('vextrip_users', JSON.stringify(updatedUsers));
      }
      
      // Create session
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('vextrip_session', sessionId);
      localStorage.setItem('vextrip_user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));
      
      setSuccess(`¡Conectado con ${provider}!`);
      console.log('✅ Social login successful:', user.email);
      
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Social login error:', error);
      setError(`Error al conectar con ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
    setShowPassword(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center p-6 pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-full">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="text-gray-600 text-sm">
            {isLogin 
              ? 'Accede a tu cuenta para disfrutar de todas las funciones' 
              : 'Únete a vextrip y descubre San Rafael'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Forgot Password (Login only) */}
          {isLogin && (
            <div className="text-right mt-3">
              <a href="#" className="text-sm text-orange-600 hover:text-orange-700 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
          >
            {isLoading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O continúa con</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Additional Social Login Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('tiktok')}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">TikTok</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('instagram')}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <defs>
                  <radialGradient id="instagram-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#405DE6"/>
                    <stop offset="25%" stopColor="#5851DB"/>
                    <stop offset="50%" stopColor="#833AB4"/>
                    <stop offset="75%" stopColor="#C13584"/>
                    <stop offset="100%" stopColor="#E1306C"/>
                  </radialGradient>
                </defs>
                <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">Instagram</span>
            </button>
          </div>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                type="button"
                onClick={switchMode}
                className="ml-1 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
