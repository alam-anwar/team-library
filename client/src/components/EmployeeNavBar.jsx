import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function EmployeeNavbar() {
  const {user, setUser} = useContext(UserContext);

  const logout = async(e) => {
    setUser(null);
    Navigate("/");
  }

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <div className="flex">
          <NavLink to="/employee/inventorymanager">
            <img alt="Libbie logo" className="h-10 inline mr-6" src="https://uspto.report/TM/90366305/mark.png"></img>
          </NavLink>
        </div>

        <div className="flex">
          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2" to="/employee/inventorymanager">
            Inventory Manager
          </NavLink>  
          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2" to="/employee/calendar">
            Calendar
          </NavLink>
          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2" to="/employee/processreturns">
            Process Returns
          </NavLink>
          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2" to="/employee/newmember">
            Add Member
          </NavLink>
          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2" to="/employee/profile">
            Edit Profile
          </NavLink>
          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to ='/'>
            Logout
          </NavLink>
        </div>
      </nav>
    </div>
  );
}