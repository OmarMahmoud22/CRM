// import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashbourd_TeamLeader() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const feching = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:5000/api/all-lead", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    feching();
  }, []);
  return (
    <>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
            <p>{item.phone}</p>
            <p>{item.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}
