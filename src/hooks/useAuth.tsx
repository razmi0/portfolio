import { AuthContext } from "@/provider/AuthProvider";
import type { AuthContext as AuthContextType, AuthData } from "@/types";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  useEffect(() => {
    console.log("useEffect from useAuth : ");
    const payload = localStorage.getItem("auth");
    console.log("payload from useAuth : ", payload);

    if (payload) {
      const success = context?.signIn(() => Promise.resolve(JSON.parse(payload)));
      console.log("success from useAuth (at mount from LS) : ", success);
    }
  }, []);

  return context as AuthData & AuthContextType;
};
