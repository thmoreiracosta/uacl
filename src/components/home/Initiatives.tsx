import React from "react";
import { Link } from "react-router-dom";
import { initiatives } from '../../data/initiativesData';





export const Initiatives: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-secondary w-12 mr-4"></div>
            <span className="text-secondary uppercase tracking-widest text-sm">
              Nossas Iniciativas
            </span>
            <div className="h-px bg-secondary w-12 ml-4"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            O Que Fazemos
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          <p className="text-gray-700 max-w-2xl mx-auto mt-6">
            Conheça as principais áreas de atuação da União Apostólica Cardeal
            Leme na promoção da fé e da cultura católica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="bg-white p-6 border border-gray-200 hover-lift"
            >
              <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
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
              <Link
                to={`/iniciativas/${initiative.id}`}
                className="inline-flex items-center text-secondary hover:text-primary"
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
            <svg
              className="w-4 h-4 ml-2"
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
          </Link>
        </div>
      </div>
    </section>
  );
};
