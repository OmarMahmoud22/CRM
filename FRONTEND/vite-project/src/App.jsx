import "./App.css";
import Login from "./Compnent/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./Compnent/Users/Users";
import Register from "./Compnent/Register/Regester";
import Dashbourd_Agent from "./Compnent/Dash/Dashbourd_Agent";
import RollRoutes from "./Compnent/AuthRoutes/RollRoutes";
import Layout from "./Compnent/Layout/Layout";
import CreateLead from "./Compnent/CreateLead/CreateLead";
import Dashbourd_Admin from "./Compnent/Dash/Dashbourd_Admin";
import Unauthorized from "./Compnent/AuthRoutes/Unauthorized";
import AllLead from "./Compnent/AllLead/AllLead";
import InfoLead from "./Compnent/AllLead/InfoLead";
import FilterStatus from "./Compnent/AllLead/FilterStatus";
import Dashbourd_TeamLeader from "./Compnent/Dash/Dashbourd_TeamLeader";
import Tasks from "./Compnent/Tasks/Tasks";
import Notifications from "./Compnent/Notifications/Notifications";
import InfoUser from "./Compnent/Users/InfoUser";

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
          <RollRoutes allowedroes={["agent", "admin", "SuperAdmin"]}>
            <Dashbourd_Agent />
          </RollRoutes>
        ),
      },
      {
        path: "agent-dashbourd/filter",
        element: (
          <RollRoutes allowedroes={["agent", "admin", "SuperAdmin"]}>
            <FilterStatus />
          </RollRoutes>
        ),
      },
      {
        path: "admin-dashbourd",
        element: (
          <RollRoutes allowedroes={["admin", "SuperAdmin"]}>
            <Dashbourd_Admin />
          </RollRoutes>
        ),
      },
      {
        path: "AllLead",
        element: (
          <RollRoutes allowedroes={["agent", "admin", "SuperAdmin", "TeamLeader"]}>
            <AllLead />
          </RollRoutes>
        ),
      },
      {
        path: "tasks",
        element: (
          <RollRoutes allowedroes={["agent", "admin", "SuperAdmin", "TeamLeader"]}>
            <Tasks />
          </RollRoutes>
        ),
      },
      {
        path: "infoLead/:id",
        element: (
          <RollRoutes allowedroes={["agent", "admin", "SuperAdmin", "TeamLeader"]}>
            <InfoLead />
          </RollRoutes>
        ),
      },
      {
        path: "TeamLeader",
        element: (
          <RollRoutes allowedroes={["TeamLeader", "admin", "SuperAdmin"]}>
            <Dashbourd_TeamLeader />
          </RollRoutes>
        ),
      },
      {
        path: "noti",
        element: (
          <RollRoutes allowedroes={["agent", "admin", "SuperAdmin", "TeamLeader", "Dataentry"]}>
            <Notifications />
          </RollRoutes>
        ),
      },
      {
        path: "allUsers",
        element: (
          <RollRoutes allowedroes={["admin", "SuperAdmin"]}>
            <Users />
          </RollRoutes>
        ),
      },
      {
        path: "infoUsers/:id",
        element: (
          <RollRoutes allowedroes={["admin", "SuperAdmin"]}>
            <InfoUser />
          </RollRoutes>
        ),
      },
      {
        path: "create-lead",
        element: (
          <RollRoutes allowedroes={["Dataentry", "admin", "SuperAdmin"]}>
            <CreateLead />
          </RollRoutes>
        ),
      },
    ],
  },
  {
    path: "/AddeLead",
    element: (
      <RollRoutes allowedroes={["Dataentry", "admin", "SuperAdmin"]}>
        <CreateLead />
      </RollRoutes>
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
