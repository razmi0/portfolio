import { initAuthOptions, initContext } from "@/provider/AuthProvider";
import type { ResponseLoginType } from "@/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type SignInType = () => Promise<ResponseLoginType>;

type AuthOptions = {
  credentials: RequestCredentials;
  method: RequestInit["method"];
  headers: {
    Authorization: string;
    "Access-Control-Allow-Credentials": true;
  };
};

type AuthData = {
  isAuthenticated: boolean;
  signIn: (cb: SignInType) => Promise<void>;
  signOut: () => void;
  authOptions: AuthOptions & Partial<RequestInit>;
};

const AuthContext = createContext<AuthData>(initContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthData>(initContext);

  const setHeaders = useCallback(
    (token: string): AuthOptions & Partial<RequestInit> => ({
      // credentials: "include",
      // method: "GET",
      ...(initAuthOptions as AuthOptions & Partial<RequestInit>),
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Credentials": true,
      } as any, // BOUUUUUUU
    }),
    []
  );

  const signIn = useCallback(async (cb: SignInType) => {
    const response = await cb();
    console.log(response);
    if (response.success) {
      const newState = {
        ...authState,
        isAuthenticated: response.authorized,
        user: response.payload.user,
        exp: response.payload.exp,
        authOptions: setHeaders(response.token),
      };
      setAuthState(newState);
      localStorage.setItem("auth", JSON.stringify(newState));
    }
  }, []);

  const signOut = useCallback(() => {
    setAuthState(initContext);
    localStorage.removeItem("auth");
  }, []);

  return <AuthContext.Provider value={{ ...authState, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthData => {
  const context = useContext(AuthContext);

  useEffect(() => {
    const payload = localStorage.getItem("auth");
    if (payload && context) {
      context?.signIn(() => Promise.resolve(JSON.parse(payload)));
    }
  }, []);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context as AuthData;
};
