import React from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="font-serif font-bold text-primary">Notificações</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500">
              Você tem {unreadCount} {unreadCount === 1 ? 'notificação não lida' : 'notificações não lidas'}
            </p>
          )}
        </div>
        {unreadCount > 0 && onMarkAllAsRead && (
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-secondary hover:text-primary"
          >
            Marcar todas como lidas
          </button>
        )}
      </div>
      
      {notifications.length > 0 ? (
        <div>
          {notifications.map((notification, index) => (
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
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-xs">{formatDate(notification.date)}</p>
                {!notification.read && onMarkAsRead && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-xs text-secondary hover:text-primary"
                  >
                    Marcar como lida
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          Nenhuma notificação no momento.
        </div>
      )}
    </div>
  );
};
