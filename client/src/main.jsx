import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import "./index.css";
import LandingPage from "./components/LandingPage";
import CheckoutPage from "./components/CheckoutPage";
import ProfileView from "./components/ProfileView";
import InventorySearch from "./components/InventorySearch";
import MemberNavbar from "./components/MemberNavBar";
import CheckedOut from "./components/ViewCheckedOut";
import EventsPage from "./components/EventsPage";
import EmployeeNavbar from "./components/EmployeeNavBar";
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
      {
        path: "/",
        element: (
          <>
            <AdminNavbar />
            <ModifyInventory />
          </>
        )
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
        path: "/homepage",
        element: <LandingPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/profile",
        element: <ProfileView />,
      },
      {
        path: "/inventory",
        element: <InventorySearch />,
      },
      {
        path: "/create",
        element: <ItemForm />,
      },
      {
        path: "/member/checkedout",
        element: (
          <>
            <MemberNavbar />
            <CheckedOut />
          </>
        ),
      },
      {
        path: "/member/eventspage",
        element: (
          <>
            <MemberNavbar />
            <EventsPage />
          </>
        ),
      },
      {
        path: "/processreturn",
        element: (
          <>
            <EmployeeNavbar />
            <ProcessReturns />
          </>
        ),
      },
      {
        path: "/createmember",
        element: (
          <>
            <EmployeeNavbar />
            <CreateMember />
          </>
        ),
      },
      {
        path: "/employee/calendar",
        element: (
          <>
            <EmployeeNavbar />
            <EmployeeCalendar />
          </>
        ),
      },
      {
        path: "/admin/deleteaccount",
        element: (
          <>
            <AdminNavbar />
            <DeleteAccount />
          </>
        ),
      },
      {
        path: "/admin/calendar",
        element: (
          <>
            <AdminNavbar />
            <AdminCalendar />
          </>
        ),
      },
      {
        path: "/modifyinventory",
        element: (
          <>
            <AdminNavbar />
            <ModifyInventory />
          </>
        ),
      },
      {
        path: "/updateitem/:id",
        element: (
          <>
            <AdminNavbar />
            <ItemForm/>
          </>
        ),
      },
      {
        path: "/updateevent",
        element: (
          <>
            <AdminNavbar />
            <UpdateEvent/>
          </>
        ),
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);