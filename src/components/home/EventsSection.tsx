import React from "react";
import { Link } from "react-router-dom";
import { eventsData } from "../../data/eventsData";

export const EventsSection: React.FC = () => {
  const formatDate = (dateString: string) => {
    const parts = dateString.split("-").map(Number); // [2025, 08, 01]
    const date = new Date(parts[0], parts[1] - 1, parts[2]); // mês começa em 0
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-secondary w-12 mr-4"></div>
            <span className="text-secondary uppercase tracking-widest text-sm">
              Agenda
            </span>
            <div className="h-px bg-secondary w-12 ml-4"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Próximos Eventos
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          <p className="text-gray-700 max-w-2xl mx-auto mt-6">
            Participe de nossos eventos e aprofunde sua formação espiritual e
            intelectual na tradição católica.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 hover-lift overflow-hidden"
            >
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 m-4">
                  {formatDate(event.date)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-primary mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span className="text-sm">{event.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <Link
                  to={`/eventos/${event.id}`}
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/eventos"
            className="inline-flex items-center bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300"
          >
            <span>Ver Todos os Eventos</span>
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
