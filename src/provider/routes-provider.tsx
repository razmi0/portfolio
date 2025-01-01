import { useContext, useState } from "react";

import type { Routes } from "@/types";
import { ReactNode, createContext } from "react";

const routes = ["index", "login", "dashboard"] as Readonly<Routes[]>;
const isValidRoute = (route: string): route is Routes => routes.includes(route as Routes);

type RouterState = {
    route: Routes;
    previous: Routes[];
};

type RouterAction = {
    type: "SET_ROUTE";
    payload: Routes;
};

type RouterContextType = {
    routes: RouterState;
    changeRoute: (route: Routes) => false | void;
};

const RouterContext = createContext<RouterContextType>({
    routes: { route: "index", previous: [] },
    changeRoute: () => {},
});

const RouterProvider = ({ children }: { children: ReactNode }) => {
    const [routes, setRoutes] = useState<RouterState>({ route: "index", previous: [] });

    const reducer = (action: RouterAction) => {
        switch (action.type) {
            case "SET_ROUTE": {
                if (action.payload !== routes.route) {
                    history.replaceState(null, "", action.payload === "index" ? "/" : `/${action.payload}`);

                    if (routes.previous.length > 2) {
                        routes.previous.shift();
                    }

                    setRoutes({
                        route: action.payload,
                        previous: [...routes.previous, routes.route],
                    });
                }
                break;
            }

            default:
                break;
        }
    };

    const changeRoute = (route: Routes) => {
        if (isValidRoute(route)) {
            reducer({ type: "SET_ROUTE", payload: route });
        }
    };

    return <RouterContext.Provider value={{ routes, changeRoute }}>{children}</RouterContext.Provider>;
};

const useRouter = () => {
    const { routes, changeRoute } = useContext(RouterContext);

    return {
        ...routes,
        changeRoute,
    };
};

export { RouterContext, RouterProvider, useRouter };
