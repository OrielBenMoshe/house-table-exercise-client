import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "antd/dist/reset.css";
import "./index.css";
import "./assets/styles/main.scss";

import ErrorPage from "./routes/error-page.jsx";
import App from "./routes/App.js";
import Home from "./routes/Home.js";
// import HousesList from "./routes/HousesList.js";
import HousePage from "./routes/HousePage.js";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      {/* <Route path="/houses" element={<HousesList />} /> */}
      <Route path="/house/:id" element={<HousePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
