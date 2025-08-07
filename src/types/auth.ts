export interface User {
  uid: string;
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
}