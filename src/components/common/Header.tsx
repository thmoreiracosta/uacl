import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Cardeal Leme', href: '/cardeal-leme' },
    { name: 'Iniciativas', href: '/iniciativas' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Contato', href: '/contato' },
    { name: 'Seja Membro', href: '/seja-membro' },
  ];

  return (
    <header className={`fixed w-full z-50 bg-white ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="bg-primary text-white py-1 px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <a href="mailto:contato@uniaoapostolica.com" className="flex items-center hover:text-secondary-light">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                contato@uniaoapostolica.com
              </a>
              <a href="tel:+552133334444" className="flex items-center hover:text-secondary-light">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                (21) 9 9999.9999
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:text-secondary-light">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-secondary-light">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-secondary-light">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Header */}
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 ml-[-10px]">
            <div className="h-20 w-20 rounded-full flex items-center justify-center border-4 border-secondary">
              <img className="h-18 w-18" src="../src/assets/LOGO2.png" alt="logo-uniao-apostolica" />              
            </div>
            <div>
              <h1 className="text-primary font-serif text-2xl tracking-wide">União Apostólica</h1>
              <span className="text-secondary text-sm tracking-widest uppercase">Cardeal Leme</span>
            </div>
          </Link>
          
          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-primary hover:text-secondary menu-link font-medium ${
                  location.pathname === item.href ? 'text-secondary' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                to="/membro/dashboard"
                className="bg-primary text-white px-5 py-2 rounded-sm hover:bg-primary-dark transition-colors duration-300 flex items-center"
              >
                <span>Área de Membros</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-5 py-2 rounded-sm hover:bg-accent transition-colors duration-300 flex items-center"
              >
                <span>Área de Membros</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            )}
          </nav>
          
          {/* Menu Mobile Toggle */}
          <button
            className="lg:hidden text-primary focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 py-5 space-y-4 border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-primary hover:text-secondary font-medium ${
                  location.pathname === item.href ? 'text-secondary' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                to="/membro/dashboard"
                className="block bg-primary text-white px-4 py-2 rounded-sm text-center font-medium hover:bg-secondary transition-colors duration-300 mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Área de Membros
              </Link>
            ) : (
              <Link
                to="/login"
                className="block bg-primary text-white px-4 py-2 rounded-sm text-center font-medium hover:bg-secondary transition-colors duration-300 mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Área de Membros
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};