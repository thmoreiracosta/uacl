import React from 'react';
import { Link } from 'react-router-dom';

interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const initiatives: Initiative[] = [
  {
    id: '1',
    title: 'Formação Espiritual',
    description: 'Cursos, retiros e encontros para o crescimento na fé e na vida espiritual.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    id: '2',
    title: 'Estudos Doutrinais',
    description: 'Aprofundamento no conhecimento da doutrina católica e da tradição da Igreja.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    id: '3',
    title: 'Ação Social',
    description: 'Projetos de solidariedade e promoção humana inspirados na Doutrina Social da Igreja.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    id: '4',
    title: 'Cultura e Arte',
    description: 'Promoção da cultura e da arte como expressões da beleza e da verdade.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  },
  {
    id: '5',
    title: 'Família e Juventude',
    description: 'Iniciativas voltadas para o fortalecimento da família e a formação da juventude.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    id: '6',
    title: 'Diálogo e Comunicação',
    description: 'Promoção do diálogo com a cultura contemporânea e comunicação da fé.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
];

export const Initiatives: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-secondary w-12 mr-4"></div>
            <span className="text-secondary uppercase tracking-widest text-sm">Nossas Iniciativas</span>
            <div className="h-px bg-secondary w-12 ml-4"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">O Que Fazemos</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          <p className="text-gray-700 max-w-2xl mx-auto mt-6">
            Conheça as principais áreas de atuação da União Apostólica Cardeal Leme
            na promoção da fé e da cultura católica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative) => (
            <div key={initiative.id} className="bg-white p-6 border border-gray-200 hover-lift">
              <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={initiative.icon}></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-3">{initiative.title}</h3>
              <p className="text-gray-600 mb-4">{initiative.description}</p>
              <Link
                to={`/iniciativas/${initiative.id}`}
                className="inline-flex items-center text-secondary hover:text-primary"
              >
                <span>Saiba mais</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/iniciativas"
            className="inline-flex items-center bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300"
          >
            <span>Todas as Iniciativas</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
