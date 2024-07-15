import { createContext } from "react";

type AuthContextData = {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const initContext = {
  signIn: async () => {},
  signOut: async () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextData>(initContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={initContext}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return AuthContext;
};
