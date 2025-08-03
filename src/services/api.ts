import axios from 'axios';
import { mockNotifications } from "../data/notificationsData"
import type { UserNotification } from '../types/notification';


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
export const getNotifications = async (): Promise<UserNotification[]> => {
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
