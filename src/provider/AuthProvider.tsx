import type { AuthData, AuthOptions, SignInType } from "@/types";
import { createContext, useCallback, useState } from "react";

export const initAuthOptions = {
  credentials: "include",
  method: "GET",
  headers: {
    Authorization: "",
    "Access-Control-Allow-Credentials": true,
  },
};

export const initContext = {
  signIn: async () => {},
  signOut: () => {},
  isAuthenticated: false,
  authOptions: initAuthOptions as AuthOptions & Partial<RequestInit>,
  user: "",
  exp: 0,
} as AuthData;

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
