import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Course {
  id: string;
  title: string;
  progress: number;
  image: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setCourses([
        {
          id: '1',
          title: 'Introdução à Doutrina Social da Igreja',
          progress: 45,
          image: 'https://images.unsplash.com/photo-1601142634808-38923eb7c560?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          id: '2',
          title: 'História da Igreja no Brasil',
          progress: 20,
          image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
          id: '3',
          title: 'Vida e Obra do Cardeal Leme',
          progress: 75,
          image: 'https://images.unsplash.com/photo-1601142634808-38923eb7c560?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
      ]);

      setEvents([
        {
          id: '1',
          title: 'Retiro Espiritual de Pentecostes',
          date: '2023-06-12',
          type: 'Retiro',
        },
        {
          id: '2',
          title: 'Seminário de Doutrina Social',
          date: '2023-05-25',
          type: 'Seminário',
        },
        {
          id: '3',
          title: 'Encontro de Formação',
          date: '2023-07-15',
          type: 'Formação',
        },
      ]);

      setNotifications([
        {
          id: '1',
          title: 'Novo curso disponível',
          message: 'O curso "Vida e Obra do Cardeal Leme" já está disponível na plataforma.',
          date: '2023-05-10',
          read: false,
        },
        {
          id: '2',
          title: 'Lembrete de evento',
          message: 'O Retiro Espiritual de Pentecostes acontecerá em 2 dias.',
          date: '2023-06-10',
          read: true,
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-primary">Bem-vindo, {user?.name}!</h1>
        <p className="text-gray-600">Confira suas atividades e novidades.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 border border-gray-200 hover-lift">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Cursos em Andamento</p>
              <p className="text-2xl font-bold text-primary">{courses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 border border-gray-200 hover-lift">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Próximos Eventos</p>
              <p className="text-2xl font-bold text-primary">{events.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 border border-gray-200 hover-lift">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-accent bg-opacity-10 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Notificações</p>
              <p className="text-2xl font-bold text-primary">{notifications.filter(n => !n.read).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses in Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-serif font-bold text-primary">Cursos em Andamento</h2>
          <Link to="/membro/cursos" className="text-secondary hover:text-primary flex items-center">
            <span>Ver todos</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 hover-lift overflow-hidden">
              <div className="h-40 bg-gray-200 relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-primary mb-2">{course.title}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-secondary h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progresso</span>
                  <span className="text-primary font-medium">{course.progress}%</span>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <Link
                  to={`/membro/cursos/${course.id}`}
                  className="text-secondary hover:text-primary flex items-center justify-center"
                >
                  <span>Continuar</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-bold text-primary">Próximos Eventos</h2>
            <Link to="/membro/agenda" className="text-secondary hover:text-primary flex items-center">
              <span>Ver todos</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="bg-white border border-gray-200">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`p-4 flex items-start ${
                  index !== events.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-medium">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-primary">{event.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {formatDate(event.date)} • {event.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-bold text-primary">Notificações</h2>
            <Link to="/membro/notificacoes" className="text-secondary hover:text-primary flex items-center">
              <span>Ver todas</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="bg-white border border-gray-200">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 ${
                    !notification.read ? 'bg-secondary bg-opacity-5' : ''
                  } ${index !== notifications.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-primary">{notification.title}</h3>
                    {!notification.read && (
                      <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                        Nova
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                  <p className="text-gray-500 text-xs mt-2">{formatDate(notification.date)}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Nenhuma notificação no momento.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
