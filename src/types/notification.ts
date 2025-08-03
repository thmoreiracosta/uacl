import type { Timestamp } from "firebase/firestore"; // para Firebase

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string | Timestamp; // aceita os dois tipos (mock e Firebase)
}
