import "./App.css";

import Login from "./Compnent/pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Compnent/pages/Regester/Regester";
import Dashbourd from "./Compnent/Dash/Dashbourd";
import AuthRoutes from "./Compnent/AuthRoutes/AuthRoutes";
import Layout from "./Compnent/Layout/Layout";
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
    path: "/start",
    element: <Layout />,
    children: [
      {
        path: "dashbord",
        element: (
          <AuthRoutes>
            <Dashbourd />
          </AuthRoutes>
        ),
      },
    ],
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
