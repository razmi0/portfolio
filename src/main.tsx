import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider } from "./components/Router/RoutesProvider.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import "./tailwind/output.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
