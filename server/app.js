import { UserProvider } from './context/UserContext'; // Adjust the path as necessary

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
