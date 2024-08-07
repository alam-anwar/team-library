import { Outlet } from "react-router-dom"
import { UserProvider } from './UserContext'; // Adjust the path as necessary
import './App.css'

const App = () => {
    return (
        <UserProvider>
            <div className="w-full p-6">
                <Outlet />
            </div>
        </UserProvider>
    )
}

export default App
