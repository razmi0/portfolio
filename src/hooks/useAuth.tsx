import { AuthContext } from "@/provider/auth-provider";
import type { AuthContext as AuthContextType, AuthData } from "@/types";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useEffect(() => {
    const payload = localStorage.getItem("auth");
    const signInAtMount = async () => {
      if (payload) {
        const data = JSON.parse(payload);
        const success = await context?.signIn(() => Promise.resolve(data));
        if (!success) {
          localStorage.removeItem("auth");
        }
      }
    };
    signInAtMount();
  }, []);

  return context as AuthData & AuthContextType;
};
