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
    const fetchData = async () => {
      if (payload) {
        const data = JSON.parse(payload);
        const success = await context?.signIn(() => Promise.resolve(data));
        console.log("success from useAuth (at mount from LS) : ", success);
      }
    };

    fetchData();
  }, []);

  return context as AuthData & AuthContextType;
};
