import type { User } from "../types/auth";

// Mock de usuários
const mockUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    password: "password123", // usado apenas internamente para validação
  },
  {
    id: "2",
    name: "Thiago Costa",
    email: "thiagomoreiracosta@gmail.com",
    password: "password321"
  },
];

export const login = async (
  email: string,
  password: string
): Promise<Omit<User, "password">> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        // ou para garantir que não gere warning:
        void password;

        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        resolve(userWithoutPassword);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("user");
      resolve();
    }, 500);
  });
};

export const getCurrentUser = async (): Promise<Omit<
  User,
  "password"
> | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        resolve(JSON.parse(userStr));
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const register = async (
  userData: Omit<User, "id"> & { password: string }
): Promise<Omit<User, "password">> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: String(mockUsers.length + 1),
        name: userData.name,
        email: userData.email,
      };

      mockUsers.push({ ...newUser, password: userData.password });
      localStorage.setItem("user", JSON.stringify(newUser));
      resolve(newUser);
    }, 1000);
  });
};
