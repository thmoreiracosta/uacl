import React, { useState, useEffect } from 'react';
import { EventCalendar } from '../../components/member/EventCalendar';
import { Modal } from '../../components/common/Modal';
import { Loader } from '../../components/common/Loader';
import { getEvents } from '../../services/events';
import type { Event } from '../../types/event';

export const Schedule: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError('Erro ao carregar os eventos. Por favor, tente novamente.');
        console.error('Error fetching events:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-primary">Agenda</h1>
        <p className="text-gray-600">Acompanhe os próximos eventos e atividades.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <EventCalendar events={events} onEventClick={handleEventClick} />

      <div className="mt-8">
        <h2 className="text-xl font-serif font-bold text-primary mb-4">Próximos Eventos</h2>
        <div className="bg-white border border-gray-200">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-primary font-medium">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-primary">{event.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {formatDate(event.date)} • {event.location}
                    </p>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Nenhum evento agendado no momento.
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalhes do Evento"
      >
        {selectedEvent && (
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-primary mb-2">{selectedEvent.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>{formatDate(selectedEvent.date)}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{selectedEvent.location}</span>
              </div>
              <p className="text-gray-700">{selectedEvent.description}</p>
            </div>
            
            {selectedEvent.organizer && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">Organizador:</h4>
                <p>{selectedEvent.organizer}</p>
              </div>
            )}
            
            {selectedEvent.participants && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">Participantes:</h4>
                <p>{selectedEvent.participants} pessoas confirmadas</p>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors duration-300 mr-2"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  // In a real app, this would register the user for the event
                  alert('Inscrição confirmada!');
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-primary text-white font-medium hover:bg-primary-dark transition-colors duration-300"
              >
                Inscrever-se
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
