import type { Routes } from "@/types";
import { useCallback, useReducer } from "react";

type RouterState = {
  current: Routes;
  previous: Routes[];
};

type RouterAction = {
  type: "SET_ROUTE" | "GO_BACK";
  payload: Routes;
};

const routerReducer = (state: RouterState, action: RouterAction) => {
  switch (action.type) {
    case "SET_ROUTE": {
      if (action.payload !== state.current) {
        history.replaceState(null, "", action.payload === "index" ? "/" : `/${action.payload}`);

        if (state.previous.length > 2) {
          state.previous.shift();
        }
        return {
          current: action.payload,
          previous: [...state.previous, state.current],
        };
      }
      return state;
    }

    default:
      return state;
  }
};

const routes = ["index", "login", "admin"] as readonly Routes[];
const useRouter = () => {
  const [state, dispatch] = useReducer(routerReducer, { current: "index", previous: [] });

  const setRoute = useCallback((route: Routes) => {
    dispatch({ type: "SET_ROUTE", payload: route });
  }, []);

  const isValidRoute = (route: string): route is Routes => routes.includes(route as Routes);

  const changeRoute = (route: Routes) => isValidRoute(route) && setRoute(route);

  return {
    ...state,
    changeRoute,
  };
};

export default useRouter;
