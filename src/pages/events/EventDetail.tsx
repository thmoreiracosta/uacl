import React from "react";
import { useParams, Link } from "react-router-dom";
import { eventsData } from "../../data/eventsData";
import { Header } from "../../components/common/Header";
import { ButtonWhatsappContact } from "../../components/common/ButtonWhatsappContact";

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-xl text-gray-600">Evento não encontrado.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const parts = dateString.split("-").map(Number);
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <Header />

      <section className="py-16 md:py-24 mt-24 bg-cream min-h-screen relative">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            {event.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/2 bg-white p-6 rounded-md shadow text-gray-700 leading-relaxed">
              <div className="mb-6 text-gray-600 text-sm space-y-1">
                <p>
                  <strong>Data:</strong> {formatDate(event.date)}{" "}
                  {event.endDate && ` a ${formatDate(event.endDate)}`}
                </p>
                <p>
                  <strong>Horário:</strong> {event.time}{" "}
                  {event.endTime && `às ${event.endTime}`}
                </p>
                <p>
                  <strong>Local:</strong> {event.location}
                </p>
                {!event.isOnline && event.address && (
                  <p>
                    <strong>Endereço:</strong> {event.address.street},{" "}
                    {event.address.city} - {event.address.state}
                  </p>
                )}
                {event.isOnline && (
                  <p>
                    <strong>Online:</strong>{" "}
                    <a
                      href={event.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary underline"
                    >
                      Acesse aqui
                    </a>
                  </p>
                )}
                {!event.isFree && (
                  <p>
                    <strong>Preço:</strong> R$ {event.price},00
                  </p>
                )}
                {event.requiresMembership && (
                  <p className="text-red-600 font-semibold">
                    * Requer inscrição prévia ou associação
                  </p>
                )}
              </div>
              <p className="mb-4">{event.description}</p>

              {event.speakers && event.speakers.length > 0 && (
                <div className="bg-white p-6 rounded-md shadow text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Palestrantes{event.speakers.length > 1 ? "s" : ""}
                  </h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={event.speakers[0].avatar}
                      alt={event.speakers[0].name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold">{event.speakers[0].name}</p>
                      <p className="text-sm text-gray-500">
                        {event.speakers[0].title}
                      </p>
                      <p className="text-sm mt-1">{event.speakers[0].bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-1/2">
              <img
                src={event.image}
                alt={event.title}
                className="w-full object-cover rounded-xl shadow-md"
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/contato"
              className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-secondary transition"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
      {/* Botão flutuante WhatsApp */}
      <ButtonWhatsappContact />
    </>
  );
};
