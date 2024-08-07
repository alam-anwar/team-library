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
import AdminNavbar from "./components/AdminNavBar";
import AdminCalendar from "./components/AdminCalendar";
import ModifyInventory from "./components/EditInventory";
import ItemForm from "./components/ItemForm";
import UpdateEvent from "./components/UpdateEvent";
import AccountManager from "./components/AccountManager";
import RsvpPage from "./components/RsvpPage";
import MemberInventorySearch from "./components/MemberInventorySearch"
import InventoryDetails from "./components/InventoryDetails";
import EventDetails from "./components/EventDetails";
import MemberEvents from "./components/MemberEvents";

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
            element: <LoginForm />,
          },
          {
            path: "/inventory/*",
            element: <App />,
            children: [
              {
                path: "",
                element: <InventorySearch />,
              },
              {
                path: "details/:id",
                element: <InventoryDetails />
              }
            ]
          },
          {
            path: "/calendar",
            element: <App />,
            children: [
              {
                path: "",
                element: <EventsPage />,
              },
              {
                path: "details/:id",
                element: <EventDetails />
              }
            ]
          },
          {
            path: "/login",
            element: <LoginForm />,
          },
          {
            path: "/register",
            element: <RegisterForm />,
          },
          {
            //Will fix this
            path: "/homepage",
            element: <LandingPage />,
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
            path: "calendar/*",
            element: <App />,
            children: [
              {
                path: "",
                element: <MemberEvents />,
              },
              {
                path: "rsvp/:id",
                element: <RsvpPage />,
              },
            ]
          },
          {
            path: "inventory",
            element: <App />,
            children: [
              {
                path: "",
                element: <MemberInventorySearch />,
              },
              {
                path: "checkout/:id",
                element: <CheckoutPage />
              },
            ]
          },
          {
            path: "checkedout",
            element: <CheckedOut />,
          },
          {
            path: "profile",
            element: <ProfileView />,
          },
          {
            path: "checkout",
            element: <CheckoutPage />,
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
            element: <App />,
            children: [
              {
                path: "",
                element: <EmployeeCalendar />,
              },
              {
                path: "rsvp/:id",
                element: <RsvpPage />,
              },
            ]
          },
          {
            path: "inventorymanager",
            element: <App />,
            children : [
              {
                path: "",
                element: <ModifyInventory />,
              },
              {
                path: "updateItem/:id",
                element: <ItemForm />,
              },
            ]
          },
          {
            path: "processreturns",
            element: <ProcessReturns />,
          },
          {
            path: "newmember",
            element: <CreateMember />,
          },
          {
            path: "profile",
            element: <ProfileView />,
          },
          {
            path: "checkout",
            element: <CheckoutPage />,
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
            element: <App />,
            children : [
              {
                path: "",
                element: <AdminCalendar />,
              },
              {
                path: "updateevent/:id",
                element: <UpdateEvent />,
              }
            ]
          },
          {
            path: "inventorymanager",
            element: <App />,
            children : [
              {
                path: "",
                element: <ModifyInventory />,
              },
              {
                path: "updateItem/:id",
                element: <ItemForm />,
              },
            ]
          },
          {
            path: "processreturns",
            element: <ProcessReturns />,
          },
          {
            path: "accountmanager",
            element: <AccountManager />,
          },
          {
            path: "profile",
            element: <ProfileView />,
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