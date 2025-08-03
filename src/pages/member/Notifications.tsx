import React, { useState, useEffect } from "react";
import { NotificationList } from "../../components/member/NotificationList";
import { Loader } from "../../components/common/Loader";
import { mockNotifications } from "../../data/notificationsData";
import type { UserNotification } from "../../types/notification";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/api";

function parseDate(date: string | Date | { toDate: () => Date }): Date {
  if (date instanceof Date) return date;
  if (typeof date === "string") return new Date(date);
  return date.toDate(); // para Firebase.Timestamp
}

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifs = await getNotifications();
        const sorted = [...notifs].sort((a, b) => {
          const aDate =
            a.createdAt instanceof Date
              ? a.createdAt
              : typeof a.createdAt === "string"
              ? new Date(a.createdAt)
              : a.createdAt.toDate(); // Firebase.Timestamp

          const bDate =
            b.createdAt instanceof Date
              ? b.createdAt
              : typeof b.createdAt === "string"
              ? new Date(b.createdAt)
              : b.createdAt.toDate();

          return bDate.getTime() - aDate.getTime();
        });

        setNotifications(sorted);
      } catch (err) {
        console.warn("Erro ao buscar notificações da API, usando mock.", err);
        const fallback = [...mockNotifications].sort((a, b) => {
          const aDate = parseDate(a.createdAt);
          const bDate = parseDate(b.createdAt);
          return bDate.getTime() - aDate.getTime();
        });

        setNotifications(fallback);
        setError(
          "Erro ao carregar as notificações da API. Usando dados locais."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications(); // ✅ chamada correta
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
        <h1 className="text-2xl font-serif font-bold text-primary">
          Notificações
        </h1>
        <p className="text-gray-600">
          Fique por dentro das novidades e atualizações.
        </p>
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
