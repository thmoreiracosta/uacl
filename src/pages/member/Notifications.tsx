import React, { useState, useEffect } from "react";
import { NotificationList } from "../../components/member/NotificationList";
import { Loader } from "../../components/common/Loader";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  mockNotifications,
} from "../../services/api";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  createdAt?: string;
}

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifs = await getNotifications();
        setNotifications(notifs);
      } catch (err) {
        console.warn("Erro ao buscar notificações da API, usando mock.", err);
        setNotifications(mockNotifications);
        setError("Erro ao carregar as notificações da API. Usando dados locais.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Erro ao marcar notificação como lida:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Erro ao marcar todas as notificações como lidas:", err);
    }
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
        <h1 className="text-2xl font-serif font-bold text-primary">Notificações</h1>
        <p className="text-gray-600">Fique por dentro das novidades e atualizações.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
};
