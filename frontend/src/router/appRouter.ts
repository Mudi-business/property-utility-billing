import { createBrowserRouter } from "react-router-dom";
import { MainView } from "../pages/main/MainView";
import { LoginPage } from "../pages/login/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { Property } from "../pages/Property";

let appRouter = createBrowserRouter([
    {
      path: "/",
      Component: LoginPage,
    },
    // {
    //   path: "/register",
    //   Component: RegisterAccount,
    //   children: [
    //     {
    //       path: "register",
    //       Component: RegisterAccount,
    //       // loader: ({ request, params }) =>
    //       //   fetch(`/api/show/${params.id}.json`, {
    //       //     signal: request.signal,
    //       //   }),
    //     },
    //   ],
    // },
    {
      path: "/home",
      Component: MainView,
      children: [
        {
          path: "/home",
          Component: Dashboard,
          // loader: ({ request, params }) =>
          //   fetch(`/api/show/${params.id}.json`, {
          //     signal: request.signal,
          //   }),
        },
        {
          path: "/home/properties",
          Component: Property,
          // loader: ({ request, params }) =>
          //   fetch(`/api/show/${params.id}.json`, {
          //     signal: request.signal,
          //   }),
        },
        
      ],
    },
  ]);
  
  export default appRouter;