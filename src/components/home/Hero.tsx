import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-primary pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 cross-pattern"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-px bg-secondary w-12 mr-4"></div>
              <span className="text-secondary uppercase tracking-widest text-sm">Fé e Formação</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              União Apostólica <br />
              <span className="text-secondary">Cardeal Leme</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Centro de estudos e formação católica dedicado à promoção da fé, 
              da cultura e da ação social inspirada nos ensinamentos da Igreja.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/sobre"
                className="bg-secondary text-white px-6 py-3 font-medium hover:bg-opacity-90 transition-colors duration-300"
              >
                Conheça Nossa Missão
              </Link>
              <Link
                to="/seja-membro"
                className="border border-white text-white px-6 py-3 font-medium hover:bg-white hover:text-primary transition-colors duration-300"
              >
                Seja Membro
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-secondary"></div>
              <div className="bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cardeal Leme"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-4 text-center">
                <span className="block text-2xl font-serif font-bold">1882</span>
                <span className="block text-sm">1942</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#f8f5f0" fillOpacity="1" d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,128C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};
