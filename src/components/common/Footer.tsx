import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-primary-dark">
          {/* Coluna 1: Logo e Sobre */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center border-2 border-secondary">
                <span className="text-primary font-serif text-2xl font-bold">CL</span>
              </div>
              <div>
                <h4 className="text-white font-serif text-xl">União Apostólica</h4>
                <span className="text-secondary text-sm tracking-widest uppercase">Cardeal Leme</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Centro de estudos católicos dedicado à formação espiritual e intelectual, seguindo os ensinamentos da Igreja e o exemplo do Cardeal Leme.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-lg font-serif font-bold text-secondary mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-secondary transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/cardeal-leme" className="text-gray-300 hover:text-secondary transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Cardeal Leme
                </Link>
              </li>
              <li>
                <Link to="/iniciativas" className="text-gray-300 hover:text-secondary transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Iniciativas
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-gray-300 hover:text-secondary transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Eventos
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Contato */}
          <div>
            <h4 className="text-lg font-serif font-bold text-secondary mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-secondary mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p className="text-gray-300">Rua São Clemente, 225</p>
                  <p className="text-gray-300">Rio de Janeiro, RJ</p>
                </div>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:contato@uniaoapostolica.com" className="text-gray-300 hover:text-secondary transition-colors">contato@uniaoapostolica.com</a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+552133334444" className="text-gray-300 hover:text-secondary transition-colors">(21) 3333-4444</a>
              </li>
            </ul>
          </div>
          
          {/* Coluna 4: Horários */}
          <div>
            <h4 className="text-lg font-serif font-bold text-secondary mb-6">Horários</h4>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-300">Segunda a Sexta:</span>
                <span className="text-white">9h às 18h</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Sábado:</span>
                <span className="text-white">9h às 12h</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Domingo:</span>
                <span className="text-white">Fechado</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <Link to="/contato" className="inline-flex items-center bg-secondary text-white px-5 py-2 font-medium hover:bg-opacity-90 transition-colors duration-300">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Agendar Visita</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} União Apostólica Cardeal Leme. Todos os direitos reservados.</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">CNPJ: 12.345.678/0001-90</p>
        </div>
      </div>
    </footer>
  );
};