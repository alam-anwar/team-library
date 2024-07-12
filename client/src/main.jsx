import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import "./index.css";
import LandingPage from "./components/LandingPage";
import CheckoutPage from "./components/CheckoutPage";
import ProfileView from "./components/ProfileView";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginForm/>,
      },
      {
        path: "/register",
        element: <RegisterForm/>,
      },
      {
        path: "/homepage",
        element: <LandingPage/>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage/>,
      },
      {
        path: "/profile",
        element: <ProfileView/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);