// import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import API_BASE_URL, { getAuthHeaders } from "../../config/api";

export default function Dashbourd_TeamLeader() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const feching = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/all-lead`, {
          headers: getAuthHeaders(),
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
