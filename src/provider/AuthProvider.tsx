import type { AuthContext as AuthContextType, AuthData, AuthOptions, SignInType } from "@/types";
import { createContext, useCallback, useState } from "react";

export const initAuthOptions = {
  credentials: "include",
  method: "GET",
  headers: {
    Authorization: "",
    "Access-Control-Allow-Credentials": "true",
  },
} as AuthOptions;

export const initState = {
  isAuth: false,
  authOptions: initAuthOptions,
  user: "",
  exp: 0,
} as AuthData;

export const AuthContext = createContext<AuthData & AuthContextType>({
  ...initState,
  signIn: () => Promise.resolve(false),
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthData>(initState);

  const setHeaders = useCallback(
    (token: string): AuthOptions => ({
      ...initAuthOptions,

      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Credentials": "true",
      } as AuthOptions["headers"], // BOUUUUUUU
    }),
    []
  );

  const signIn = async (cb: SignInType) => {
    const { payload, res, token } = await cb();
    if (res.success) {
      const newState = {
        ...authState,
        isAuth: res.authorized,
        user: payload.user,
        exp: payload.exp,
        authOptions: setHeaders(token),
      };
      setAuthState(newState);
      localStorage.setItem("auth", JSON.stringify({ payload, res, token }));
      return true;
    }
    return false;
  };

  const signOut = useCallback(() => {
    setAuthState(initState);
    localStorage.removeItem("auth");
  }, []);

  return <AuthContext.Provider value={{ ...authState, signIn, signOut }}>{children}</AuthContext.Provider>;
};
