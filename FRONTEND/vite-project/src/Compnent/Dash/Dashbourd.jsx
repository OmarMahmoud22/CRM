import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const GetStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:3000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    GetStats();
  }, []);

  return (
    <div>
      <h1>Total Leads: {stats.totalLead}</h1>

      <h1>New Leads: {stats.New}</h1>

      <h1>Won Leads: {stats.Won}</h1>

      <h1>Lost Leads: {stats.Lost}</h1>
    </div>
  );
}