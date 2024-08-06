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
import InventorySearch from "./components/InventorySearch";
import MemberNavbar from "./components/MemberNavBar";
import CheckedOut from "./components/ViewCheckedOut";
import EventsPage from "./components/EventsPage";
import EmployeeNavbar from "./components/EmployeeNavBar";
import Navbar from "./components/Navbar"
import ProcessReturns from "./components/ProcessReturns";
import CreateMember from "./components/CreateMember";
import EmployeeCalendar from "./components/EmployeeCalendar";
import DeleteAccount from "./components/DeleteAccount";
import AdminNavbar from "./components/AdminNavBar";
import AdminCalendar from "./components/AdminCalendar";
import ModifyInventory from "./components/EditInventory";
import ItemForm from "./components/ItemForm";
import UpdateEvent from "./components/UpdateEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /********************************NON-MEMBER PAGES********************************/
      {
        path: "/",
        element: (
          <>
            <Navbar />
            <App />
          </>
        ),
        children: [
          {
            path: "/",
            element: <InventorySearch />
          },
          {
            path: "/inventory",
            element: <InventorySearch />
          },
          {
            path: "/calendar",
            element: <EventsPage />
          },
          {
            path: "/login",
            element: <LoginForm />
          },
          {
            path: "/register",
            element: <RegisterForm />
          },
          {
            //Will fix this
            path: "/homepage",
            element: <LandingPage />
          },
          
        ]
      },
      /********************************MEMBER PAGES********************************/
      {
        path: "/member/*",
        element: (
          <>
            <MemberNavbar />
            <App />
          </>
        ),
        children : [
          {
            path: "calendar",
            element: <EventsPage />
          },
          {
            path: "inventory",
            element: <InventorySearch />
          },
          {
            path: "checkedout",
            element: <CheckedOut />
          },
          {
            path: "profile",
            element: <ProfileView />
          },
          {
            path: "checkout",
            element: <CheckoutPage />
          },
        ]
      },
      /********************************EMPLOYEE PAGES********************************/
      {
        path: "/employee/*",
        element: (
          <>
            <EmployeeNavbar />
            <App />
          </>
        ),
        children : [
          {
            path: "calendar",
            element: <EmployeeCalendar />
          },
          {
            path: "modifyinventory",
            element: <App />,
            children : [
              {
                path: "",
                element: <ModifyInventory />
              },
              {
                path: "updateItem/:id",
                element: <ItemForm />
              },
            ]
          },
          {
            path: "processreturns",
            element: <ProcessReturns />
          },
          {
            path: "accountmanager",
            element: <CreateMember />
          },
          {
            path: "profile",
            element: <ProfileView />
          },
          {
            path: "checkout",
            element: <CheckoutPage />
          },
        ]
      },
      /********************************ADMIN PAGES********************************/
      {
        path: "/admin/*",
        element: (
          <>
            <AdminNavbar />
            <App />
          </>
        ),
        children : [
          {
            path: "calendar",
            element: <AdminCalendar />
          },
          {
            path: "modifyinventory",
            element: <ModifyInventory />
          },
          {
            path: "processreturns",
            element: <ProcessReturns />
          },
          {
            path: "accountmanager",
            element: <CreateMember />
          },
          {
            path: "profile",
            element: <ProfileView />
          },
          {
            path: "updateitem/:id",
            element: <ItemForm />
          },
          {
            path: "updateevent",
            element: <UpdateEvent />
          },
        ]
      },     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);