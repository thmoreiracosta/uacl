export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string; // ou Date, dependendo do que a API retorna
  date: string; // ou Date, se preferir
}
