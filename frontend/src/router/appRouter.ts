import { createBrowserRouter } from "react-router-dom";
import { MainView } from "../pages/main/MainView";
import { LoginPage } from "../pages/login/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { Property } from "../pages/Property";
import { PropertyComponent } from "../components/PropertyComponent";
import { UtilityBill } from "../pages/UtilityBIll";
import { UtilityBillComponent } from "../components/UtilityBillComponent";
import { RegisterAccount } from "../pages/login/RegisterAccount";

let appRouter = createBrowserRouter([
    {
      path: "/",
      Component: LoginPage,
    },
    {
      path: "/register",
      Component: RegisterAccount,
      children: [
        {
          path: "register",
          Component: RegisterAccount,
          // loader: ({ request, params }) =>
          //   fetch(`/api/show/${params.id}.json`, {
          //     signal: request.signal,
          //   }),
        },
      ],
    },
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
        {
          path: "/home/properties/new/property",
          Component: PropertyComponent,
          // loader: ({ request, params }) =>
          //   fetch(`/api/show/${params.id}.json`, {
          //     signal: request.signal,
          //   }),
        },
        {
          path: "/home/properties/utility/bills",
          Component: UtilityBill,
          // loader: ({ request, params }) =>
          //   fetch(`/api/show/${params.id}.json`, {
          //     signal: request.signal,
          //   }),
        },
        {
          path: "/home/properties/utility/bills/new/bill",
          Component: UtilityBillComponent,
          // loader: ({ request, params }) =>
          //   fetch(`/api/show/${params.id}.json`, {
          //     signal: request.signal,
          //   }),
        },
    
        
      ],
    },
  ]);
  
  export default appRouter;