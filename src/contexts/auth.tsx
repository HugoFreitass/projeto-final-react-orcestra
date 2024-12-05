import React, { createContext, useEffect, useState, ReactNode } from "react";

interface User {
  nome: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  signed: boolean;
  signin: (email: string, password: string) => string | void;
  signup: (nome: string, email: string, password: string) => string | void;
  signout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const userEmail = JSON.parse(userToken).email;
      const hasUser = JSON.parse(usersStorage)?.find(
        (storedUser: User) => storedUser.email === userEmail
      );

      if (hasUser) setUser(hasUser);
    }
  }, []);

  const signin = (email: string, password: string): string | void => {
    const usersStorage: User[] = JSON.parse(localStorage.getItem("users_db") || "[]");

    const hasUser = usersStorage.find((storedUser) => storedUser.email === email);

    if (hasUser) {
      if (hasUser.password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser(hasUser);
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (nome: string, email: string, password: string): string | void => {
    const usersStorage: User[] = JSON.parse(localStorage.getItem("users_db") || "[]");

    const hasUser = usersStorage.find((storedUser) => storedUser.email === email);

    if (hasUser) {
      return "Já tem uma conta com esse E-mail";
    }

    const newUser: User = { nome, email, password };
    const updatedUsers = [...usersStorage, newUser];

    localStorage.setItem("users_db", JSON.stringify(updatedUsers));

    return;
  };

  const signout = (): void => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
