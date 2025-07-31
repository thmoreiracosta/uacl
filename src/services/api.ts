import axios from 'axios';
import type { Notification } from '../types/notification';

// MOCK para desenvolvimento
export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Novo curso disponível",
    message: 'O curso "Vida e Obra do Cardeal Leme" já está disponível na plataforma.',
    date: "2023-05-10",
    read: false,
    createdAt: "2023-05-10T08:00:00Z", // ISO string ou qualquer formato aceito
  },
  {
    id: "2",
    title: "Lembrete de evento",
    message: "O Retiro Espiritual de Pentecostes acontecerá em 2 dias.",
    date: "2023-06-10",
    read: true,
    createdAt: "2023-06-08T12:00:00Z",
  },
  {
    id: "3",
    title: "Atualização de curso",
    message: 'Novos materiais foram adicionados ao curso "Doutrina Social da Igreja".',
    date: "2023-05-05",
    read: false,
    createdAt: "2023-05-05T09:30:00Z",
  },
  {
    id: "4",
    title: "Confirmação de inscrição",
    message: "Sua inscrição para o Seminário de Doutrina Social foi confirmada.",
    date: "2023-04-28",
    read: true,
    createdAt: "2023-04-27T18:00:00Z",
  },
];

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.cardealleme.org.br',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
            { refreshToken }
          );

          const { token } = response.data;
          localStorage.setItem('token', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

/// Buscar notificações do servidor ou usar mock
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (err) {
    console.warn('Erro ao buscar notificações da API, usando mock.', err);
    return mockNotifications;
  }
};

// Marcar uma notificação como lida
export const markNotificationAsRead = async (id: string): Promise<void> => {
  await api.patch(`/notifications/${id}/read`);
};

// Marcar todas como lidas
export const markAllNotificationsAsRead = async (): Promise<void> => {
  await api.patch('/notifications/read-all');
};
