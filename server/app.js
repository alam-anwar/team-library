import { Outlet } from "react-router-dom"
import { UserProvider } from 'server/UserContext.js';

const App = () => {
    return (
        <UserProvider>
            <div className="w-full p-6">
                <Outlet />
            </div>
        </UserProvider>
    );
}

export default App;
