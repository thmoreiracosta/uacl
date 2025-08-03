import type { UserNotification } from '../types/notification';

// MOCK para desenvolvimento
export const mockNotifications: UserNotification[] = [
  {
    id: "1",
    title: "Novo curso disponível",
    message: 'O curso "Vida e Obra do Cardeal Leme" já está disponível na plataforma.',    
    read: false,
    createdAt: "2023-05-10T08:00:00Z", // ISO string ou qualquer formato aceito
  },
  {
    id: "2",
    title: "Lembrete de evento",
    message: "O Retiro Espiritual de Pentecostes acontecerá em 2 dias.",    
    read: true,
    createdAt: "2023-06-08T12:00:00Z",
  },
  {
    id: "3",
    title: "Atualização de curso",
    message: 'Novos materiais foram adicionados ao curso "Doutrina Social da Igreja".',    
    read: false,
    createdAt: "2023-05-05T09:30:00Z",
  },
  {
    id: "4",
    title: "Confirmação de inscrição",
    message: "Sua inscrição para o Seminário de Doutrina Social foi confirmada.",    
    read: true,
    createdAt: "2023-04-27T18:00:00Z",
  },
];