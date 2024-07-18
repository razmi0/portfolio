// import type { Routes } from "@/types";
// import { useCallback, useReducer } from "react";

// type RouterState = {
//   route: Routes;
//   previous: Routes[];
// };

// type RouterAction = {
//   type: "SET_ROUTE" | "GO_BACK";
//   payload: Routes;
// };

// const routerReducer = (state: RouterState, action: RouterAction) => {
//   switch (action.type) {
//     case "SET_ROUTE": {
//       if (action.payload !== state.route) {
//         history.replaceState(null, "", action.payload === "index" ? "/" : `/${action.payload}`);

//         if (state.previous.length > 2) {
//           state.previous.shift();
//         }
//         return {
//           route: action.payload,
//           previous: [...state.previous, state.route],
//         };
//       }
//       return state;
//     }

//     default:
//       return state;
//   }
// };

// const routes = ["index", "login", "dashboard"] as readonly Routes[];
// const isValidRoute = (route: string): route is Routes => routes.includes(route as Routes);

// const useRouter = () => {
//   const [state, dispatch] = useReducer(routerReducer, { route: "index", previous: [] });

//   const setRoute = useCallback((route: Routes) => {
//     dispatch({ type: "SET_ROUTE", payload: route });
//   }, []);

//   const changeRoute = (route: Routes) => isValidRoute(route) && setRoute(route);

//   return {
//     ...state,
//     changeRoute,
//   };
// };

// export default useRouter;
