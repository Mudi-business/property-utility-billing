import React from "react";
import ReactDOM from "react-dom/client";
// import "@mantine/core/styles.css";

import { RouterProvider } from "react-router-dom";
import appRouter from "./router/appRouter";
import "./style/main.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

let app: any = document.getElementById("root");
const root = ReactDOM.createRoot(app);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
