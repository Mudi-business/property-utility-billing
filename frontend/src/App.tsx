import React from "react";
import ReactDOM from "react-dom/client";
// import "@mantine/core/styles.css";

import { RouterProvider } from "react-router-dom";
import appRouter from "./router/appRouter";
import './style/main.css'
import './index.css'
// import { PersistGate } from "redux-persist/integration/react";
let app: any = document.getElementById("root");
const root = ReactDOM.createRoot(app);

root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
