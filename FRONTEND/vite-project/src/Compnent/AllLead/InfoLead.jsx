// import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function InfoLead() {
  const [lead, setLead] = useState({});
  const { id } = useParams();
  //   console.log("id:", id);
  useEffect(() => {
    async function fetching() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/lead/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setLead(res.data.lead);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetching();
  }, [id]);
  const handleStatusChange = async (status) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `http://127.0.0.1:5000/api/LeadS/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLead(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <p>Name: {lead?.name}</p>
      <p>phone : {lead?.phone}</p>
      <p>email : {lead?.email}</p>
      <select
        value={lead.status || "New"}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Inteersted">Inteersted</option>
        <option value="Follow_Up">Follow Up</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>
      <p>source : {lead.source}</p>
    </div>
  );
}
