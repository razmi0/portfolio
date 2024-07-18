import { useCallback, useContext, useReducer } from "react";

import type { Routes } from "@/types";
import { ReactNode, createContext } from "react";

const routes = ["index", "login", "dashboard"] as Readonly<Routes[]>;
const isValidRoute = (route: string): route is Routes => routes.includes(route as Routes);

type RouterState = {
  route: Routes;
  previous: Routes[];
};

type RouterAction = {
  type: "SET_ROUTE" | "GO_BACK";
  payload: Routes;
};

type RouterContextType = {
  state: RouterState;
  changeRoute: (route: Routes) => false | void;
};

const RouterContext = createContext<RouterContextType>({
  state: { route: "index", previous: [] },
  changeRoute: () => {},
});

const routerReducer = (state: RouterState, action: RouterAction) => {
  switch (action.type) {
    case "SET_ROUTE": {
      if (action.payload !== state.route) {
        history.replaceState(null, "", action.payload === "index" ? "/" : `/${action.payload}`);

        if (state.previous.length > 2) {
          state.previous.shift();
        }
        return {
          route: action.payload,
          previous: [...state.previous, state.route],
        };
      }
      return state;
    }

    default:
      return state;
  }
};

const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(routerReducer, { route: "index", previous: [] });

  const setRoute = useCallback((route: Routes) => {
    dispatch({ type: "SET_ROUTE", payload: route });
  }, []);

  const changeRoute = (route: Routes) => isValidRoute(route) && setRoute(route);

  console.log("RouterProvider", state);

  return <RouterContext.Provider value={{ state, changeRoute }}>{children}</RouterContext.Provider>;
};

const useRouter = () => {
  const { state, changeRoute } = useContext(RouterContext);

  return {
    ...state,
    changeRoute,
  };
};

export { RouterContext, RouterProvider, useRouter };
