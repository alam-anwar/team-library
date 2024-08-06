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
            <InventorySearch />
          </>
        )

      },
      {
        path: "/inventory",
        element: (
          <>
            <Navbar />
            <InventorySearch />
          </>
        )
      },
      {
        path: "/calendar",
        element: (
          <>
            <Navbar />
            <EventsPage />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <Navbar />
            <LoginForm />
          </>
        )
      },
      {
        path: "/register",
        element: (
          <>
            <Navbar />
            <RegisterForm />
          </>
        )
      },
      {
        //Will fix this
        path: "/homepage",
        element: (
          <>
            <Navbar />
            <LandingPage />
          </>
        )
      },
      /********************************MEMBER PAGES********************************/
      {
        path: "/checkout",
        element: (
          <>
            <MemberNavbar />
            <CheckoutPage />
          </>
        )
      },
      {
        path: "/member/profile",
        element: (
          <>
            <MemberNavbar />
            <ProfileView />
          </>
        )
      },
      {
        path: "/member/inventory",
        element: (
          <>
            <MemberNavbar />
            <InventorySearch />
          </>
        )
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
        path: "/member/calendar",
        element: (
          <>
            <MemberNavbar />
            <EventsPage />
          </>
        ),
      },
      /********************************EMPLOYEE PAGES********************************/
      {
        path: "/employee/processreturn",
        element: (
          <>
            <EmployeeNavbar />
            <ProcessReturns />
          </>
        ),
      },
      {
        path: "/employee/profile",
        element: (
          <>
            <EmployeeNavbar />
            <ProfileView />
          </>
        )
      },
      {
        path: "/employee/accountmanager",
        element: (
          <>
            <EmployeeNavbar />
            <CreateMember />
          </>
        ),
      },
      {
        path: "/employee/modifyinventory",
        element: (
          <>
            <EmployeeNavbar />
            <ModifyInventory />
          </>
        ),
      },
      {
        path: "/admin/processreturn",
        element: (
          <>
            <EmployeeNavbar />
            <ProcessReturns />
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
      /********************************ADMIN PAGES********************************/
      {
        path: "/admin/deleteaccount",
        element: (
          <>
            <AdminNavbar />
            <DeleteAccount />
          </>
        ),
      },
      /*^^^^ Take this one out ^^^^*/
      {
        path: "/admin/accountmanager",
        element: (
          <>
            <AdminNavbar />
            <CreateMember />
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
        path: "/admin/modifyinventory",
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