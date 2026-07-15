import "./App.css";

import Login from "./Compnent/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./Compnent/Register/Regester";
import Dashbourd_Agent from "./Compnent/Dash/Dashbourd_Agent";
import RollRoutes from "./Compnent/AuthRoutes/RollRoutes";
import Layout from "./Compnent/Layout/Layout";
// import CreateLead from "./Compnent/pages/CreateLead/CreateLead";
import CreateLead from "./Compnent/CreateLead/CreateLead";
import Dashbourd_Admin from "./Compnent/Dash/Dashbourd_Admin";
import Unauthorized from "./Compnent/AuthRoutes/Unauthorized";
import AllLead from "./Compnent/AllLead/AllLead";
import InfoLead from "./Compnent/AllLead/InfoLead";
import FilterStatus from "./Compnent/AllLead/FilterStatus";
import Dashbourd_TeamLeader from "./Compnent/Dash/Dashbourd_TeamLeader";
import Tasks from "./Compnent/Tasks/Tasks";
// import JustDataEntry from "./Compnent/AuthRoutes/JustDataEntry";
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
        path: "agent-dashbourd",
        element: (
          <RollRoutes allowedroes={["agent"]}>
            <Dashbourd_Agent />
          </RollRoutes>
        ),
      },
      {
        path: "agent-dashbourd/filter",
        element: (
          <RollRoutes allowedroes={["agent"]}>
            <FilterStatus />
          </RollRoutes>
        ),
      },
      {
        path: "admin-dashbourd",
        element: (
          <RollRoutes allowedroes={["admin"]}>
            <Dashbourd_Admin />
          </RollRoutes>
        ),
      },
      {
        path: "AllLead",
        element: (
          <RollRoutes allowedroes={["agent", "admin", "TeamLeader"]}>
            <AllLead />
          </RollRoutes>
        ),
      },
      {
        path: "tasks",
        element: (
          <RollRoutes allowedroes={["agent"]}>
            <Tasks />
          </RollRoutes>
        ),
      },
      {
        path: "infoLead/:id",
        element: (
          <RollRoutes allowedroes={["agent"]}>
            <InfoLead />
          </RollRoutes>
        ),
      },
      {
        path: "TeamLeader",
        element: (
          <RollRoutes
            allowedroes={["TeamLeader"]}
          >
            <Dashbourd_TeamLeader />
          </RollRoutes>
        ),
      },
    ],
  },
  {
    path: "/AddeLead",
    element: (
      <RollRoutes allowedroes={["Dataentry"]}>
        <CreateLead />,
      </RollRoutes>
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
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
