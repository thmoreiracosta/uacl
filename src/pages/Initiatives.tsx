// Initiatives.tsx
import React from "react";
import { initiatives } from "../data/initiativesData";
import { Instagram } from "lucide-react";

export const Initiatives: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24 mt-24 relative">
        <div className="absolute inset-0 opacity-10 cross-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Nossas Iniciativas
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Conheça as principais áreas de atuação da União Apostólica Cardeal
              Leme na promoção da fé e da cultura católica.
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives Overview */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-secondary w-12 mr-4"></div>
              <span className="text-secondary uppercase tracking-widest text-sm">
                O Que Fazemos
              </span>
              <div className="h-px bg-secondary w-12 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Áreas de Atuação
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto mt-6">
              Nossa missão se concretiza através de diversas iniciativas que
              buscam promover a formação integral da pessoa e a evangelização da
              cultura.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="bg-white p-6 border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-xl rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={initiative.icon}
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-3">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 mb-4">{initiative.description}</p>
                <a
                  href={`#initiative-${initiative.id}`}
                  className="inline-flex items-center text-secondary hover:text-primary transition-colors duration-300"
                >
                  <span>Saiba mais</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Initiatives */}
      {initiatives.map((initiative, index) => (
        <section
          key={initiative.id}
          id={`initiative-${initiative.id}`}
          className={`py-16 ${index % 2 === 0 ? "bg-white" : "bg-cream"}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`${index % 2 !== 0 ? "order-2" : ""}`}>
                <div className="flex items-center mb-4">
                  <div className="h-px bg-secondary w-12 mr-4"></div>
                  <span className="text-secondary uppercase tracking-widest text-sm">
                    Iniciativa
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                  {initiative.title}
                </h2>
                <p className="text-gray-700 mb-6">{initiative.description}</p>
                {initiative.instagram && (
                  <a
                    href={initiative.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-300 mt-4"
                  >
                    <Instagram className="w-6 h-6 mr-2" />
                    <span className="underline">{initiative.instagramUser}</span>
                  </a>
                )}
              </div>
              <div className={`${index % 2 !== 0 ? "order-1" : ""}`}>
                <div className="relative">
                  <div
                    className={`absolute ${
                      index % 2 === 0 ? "-top-6 -right-6" : "-top-6 -left-6"
                    } w-full h-full border-2 border-secondary`}
                  ></div>
                  <div className="bg-white p-2">
                    <img
                      src={initiative.image}
                      alt={initiative.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Participe de nossas iniciativas
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Torne-se membro da União Apostólica Cardeal Leme e contribua para a
            evangelização da cultura e a transformação da sociedade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/seja-membro"
              className="bg-white text-primary px-6 py-3 font-medium hover:bg-secondary-light transition-colors duration-300"
            >
              Seja Membro
            </a>
            <a
              href="/contato"
              className="border border-white text-white px-6 py-3 font-medium hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
