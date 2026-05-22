import "./App.css";

import Login from "./Compnent/pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Compnent/pages/Regester/Regester";
import Dashbourd from "./Compnent/Dash/Dashbourd";
import AuthRoutes from "./Compnent/AuthRoutes/AuthRoutes";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashbord",
    element: (
      <AuthRoutes>
        <Dashbourd />,
      </AuthRoutes>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
