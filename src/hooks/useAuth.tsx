import { AuthContext } from "@/provider/AuthProvider";
import type { AuthData } from "@/types";
import { useContext, useEffect } from "react";

export const useAuth = (): AuthData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useEffect(() => {
    const payload = localStorage.getItem("auth");
    if (payload) {
      context?.signIn(() => Promise.resolve(JSON.parse(payload)));
    }
  }, []);

  return context as AuthData;
};
