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
      signal: AbortSignal.timeout(7000),
    }),
    []
  );

  const signIn = useCallback(async (cb: SignInType) => {
    const { payload, res, token } = await cb();
    console.log("response from : ", { payload, res, token });

    if (res.success) {
      console.log("response from signIn is ok", { payload, res, token });
      const newState = {
        ...authState,
        isAuthenticated: res.authorized,
        user: payload.user,
        exp: payload.exp,
        authOptions: setHeaders(token),
      };
      setAuthState(newState);
      console.log("newState", newState);
      console.log("storage from signIn");
      localStorage.setItem("auth", JSON.stringify(newState));
      return true;
    }
    console.log("response from signIn is not ok", { payload, res, token });

    return false;
  }, []);

  const signOut = useCallback(() => {
    console.log("signing out");
    setAuthState(initContext);
    localStorage.removeItem("auth");
  }, []);

  return <AuthContext.Provider value={{ ...authState, signIn, signOut }}>{children}</AuthContext.Provider>;
};
