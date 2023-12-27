import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ThemeSuspense from "./components/theme/ThemeSuspense";
import { SidebarProvider } from "./context/SidebarContext";
import "./index.css";
import router from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<ThemeSuspense />}>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </Suspense>
  </React.StrictMode>
);
