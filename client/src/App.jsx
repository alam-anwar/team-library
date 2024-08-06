import { Outlet } from "react-router-dom"
import './App.css'

const App = () => {
    return (
        <div className="w-full p-6">
            <Outlet />
        </div>
    )
}

export default App
