import { useCallback, useEffect, useReducer } from "react";

type Routes = "index" | "login" | "admin";

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
      return {
        current: action.payload,
        previous: state.current,
      };
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

  useEffect(() => console.log("Current route:", state.current), [state.current]);

  return {
    ...state,
    changeRoute: (route: Routes) => isValidRoute(route) && setRoute(route),
  };
};

export default useRouter;
