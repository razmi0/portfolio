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
  signIn: async () => false,
  signOut: () => {},
  isAuthenticated: false,
  authOptions: initAuthOptions as AuthOptions,
  user: "",
  exp: 0,
} as AuthData;

export const AuthContext = createContext<AuthData>(initContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthData>(initContext);

  const setHeaders = useCallback(
    (token: string): AuthOptions => ({
      ...(initAuthOptions as AuthOptions),
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Credentials": true,
      } as any, // BOUUUUUUU
    }),
    []
  );

  const signIn = useCallback(async (cb: SignInType) => {
    const response = await cb();

    if ("error" in response) {
      return response;
    }

    console.log(response);
    if (response.success && response.authorized && response.payload && response.token) {
      const newState = {
        ...authState,
        isAuthenticated: response.authorized,
        user: response.payload.user as string,
        exp: response.payload.exp as number,
        authOptions: setHeaders(response.token),
      };
      setAuthState(newState);
      localStorage.setItem("auth", JSON.stringify(newState));
      return true;
    }
    return false;
  }, []);

  const signOut = useCallback(() => {
    setAuthState(initContext);
    localStorage.removeItem("auth");
  }, []);

  return <AuthContext.Provider value={{ ...authState, signIn, signOut }}>{children}</AuthContext.Provider>;
};