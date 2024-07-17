import type { Routes } from "@/types";
import { useCallback, useEffect, useReducer } from "react";

type RouterState = {
  current: Routes;
  previous: Routes | null;
};

type RouterAction = {
  type: "SET_ROUTE";
  payload: Routes;
};

const routerReducer = (state: RouterState, action: RouterAction) => {
  switch (action.type) {
    case "SET_ROUTE":
      if (action.payload !== state.current) {
        history.replaceState(null, "", action.payload === "index" ? "/" : `/${action.payload}`);
        return {
          current: action.payload,
          previous: state.current,
        };
      }
      return state;
    default:
      return state;
  }
};

const routes = ["index", "login", "admin"] as readonly Routes[];
const useRouter = () => {
  const [state, dispatch] = useReducer(routerReducer, { current: "index", previous: null });

  const setRoute = useCallback((route: Routes) => {
    dispatch({ type: "SET_ROUTE", payload: route });
  }, []);

  const isValidRoute = (route: string): route is Routes => routes.includes(route as Routes);

  const changeRoute = (route: Routes) => isValidRoute(route) && setRoute(route);

  useEffect(() => console.log("Current route:", state), [state]);

  useEffect(() => {
    const currentPath = window.location.pathname.replace("/", "") as Routes;
    currentPath !== state.current && changeRoute(currentPath);
  }, []);

  return {
    ...state,
    changeRoute,
  };
};

export default useRouter;
