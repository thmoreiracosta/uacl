import React from 'react';
import { Hero } from '../components/home/Hero';
import { EventsSection } from '../components/home/EventsSection';
import { Initiatives } from '../components/home/Initiatives';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      
      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">Quem Somos</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                União Apostólica Cardeal Leme
              </h2>
              <p className="text-gray-700 mb-6">
                Somos um centro de estudos e formação católica dedicado à promoção da fé,
                da cultura e da ação social inspirada nos ensinamentos da Igreja. Fundada
                em 1995, nossa instituição busca formar líderes católicos comprometidos
                com a evangelização da cultura e a transformação da sociedade segundo os
                princípios do Evangelho.
              </p>
              <p className="text-gray-700 mb-6">
                Inspirados pelo exemplo do Cardeal Dom Sebastião Leme, que foi Arcebispo
                do Rio de Janeiro de 1930 a 1942, buscamos contribuir para a presença
                ativa dos católicos em todas as esferas da sociedade.
              </p>
              <Link
                to="/sobre"
                className="inline-flex items-center text-secondary hover:text-primary"
              >
                <span>Saiba mais sobre nossa história</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-secondary"></div>
              <div className="bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="União Apostólica Cardeal Leme"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Initiatives />
      
      {/* Cardeal Leme Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">Nosso Patrono</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Cardeal Dom Sebastião Leme
              </h2>
              <p className="text-gray-700 mb-6">
                Dom Sebastião Leme da Silveira Cintra (1882-1942) foi uma figura central
                na história da Igreja Católica no Brasil. Como Arcebispo do Rio de Janeiro
                e Cardeal, ele trabalhou incansavelmente para fortalecer a presença da
                Igreja na sociedade brasileira e promover a formação de líderes católicos.
              </p>
              <p className="text-gray-700 mb-6">
                Sua visão de uma Igreja mais presente e atuante na sociedade, sua defesa
                da educação católica e seu compromisso com a justiça social continuam a
                inspirar nossa missão e nossas atividades.
              </p>
              <Link
                to="/cardeal-leme"
                className="inline-flex items-center text-secondary hover:text-primary"
              >
                <span>Conheça mais sobre o Cardeal Leme</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-secondary"></div>
              <div className="bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cardeal Dom Sebastião Leme"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary text-white p-4 text-center">
                <span className="block text-2xl font-serif font-bold">1882</span>
                <span className="block text-sm">1942</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <EventsSection />
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-secondary w-12 mr-4"></div>
              <span className="text-secondary uppercase tracking-widest text-sm">Depoimentos</span>
              <div className="h-px bg-secondary w-12 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              O que dizem nossos membros
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cream p-6 border-t-4 border-primary">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4">
                  <img
                    src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Membro"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Maria Silva</h3>
                  <p className="text-sm text-gray-600">Membro desde 2018</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "A União Apostólica Cardeal Leme transformou minha vida espiritual e intelectual.
                Os cursos e eventos me ajudaram a aprofundar minha fé e a encontrar respostas
                para as questões do mundo contemporâneo."
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4">
                  <img
                    src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Membro"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-primary">João Santos</h3>
                  <p className="text-sm text-gray-600">Membro desde 2015</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Encontrei na União Apostólica um espaço de formação sólida e de comunhão
                fraterna. Os estudos doutrinais e as atividades sociais me ajudaram a
                integrar fé e vida de maneira concreta."
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4">
                  <img
                    src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Membro"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Ana Oliveira</h3>
                  <p className="text-sm text-gray-600">Membro desde 2020</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Como jovem católica, encontrei na União Apostólica um lugar onde posso
                crescer na fé sem abrir mão do rigor intelectual. Os cursos e as discussões
                me ajudam a dialogar com a cultura contemporânea."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Junte-se a nós
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Torne-se membro da União Apostólica Cardeal Leme e participe de nossa
            missão de evangelização da cultura e formação de líderes católicos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/seja-membro"
              className="bg-white text-primary px-6 py-3 font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              Seja Membro
            </Link>
            <Link
              to="/contato"
              className="border border-white text-white px-6 py-3 font-medium hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
