// import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashbourd() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function feching() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://127.0.0.1:3000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    feching();
  }, []);
const {totalLead , SourceState ,StatusStats} = data
console.log(SourceState);

  const info = [
    {
      title: "TOTAL LEADS",
      value: totalLead || 0,
      icon: (
        <i className="fa-solid fa-users text-logo text-xl"></i>
      ),
    },

    {
      title: "NEW LEADS",
      value: StatusStats?.New || 0,
      icon: (
        <i className="fa-solid fa-square-plus text-logo text-xl"></i>
      ),
    },

    {
      title: "LOST LEADS",
      value: StatusStats?.Lost || 0,
      icon: (
        <i className="fa-solid fa-circle-xmark text-red-500 text-xl"></i>
      ),
    },

    {
      title: "WON LEADS",
      value: StatusStats?.Won || 0,
      icon: (
        <i className="fa-solid fa-trophy text-green-500 text-xl"></i>
      ),
    },

    {
      title: "FOLLOW LEADS",
      value: StatusStats?.Follow_up || 0,
      icon: (
        <i className="fa-solid fa-phone text-yellow-500 text-xl"></i>
      ),
    },

    {
      title: "INTERESTED LEADS",
      value: StatusStats?.Inteersted || 0,
      icon: (
        <i className="fa-solid fa-heart text-pink-500 text-xl"></i>
      ),
    },

    {
      title: "CONTACTED LEADS",
      value: StatusStats?.Contacted || 0,
      icon: (
        <i className="fa-solid fa-envelope text-blue-500 text-xl"></i>
      ),
    },
  ];

  return (
    <section className="w-full md:p-6">
      
      {/* Cards */}
      <main
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4 
          xl:grid-cols-3 
          gap-4
        "
      >
        {info.map((item, index) => (
          <div
            key={index}
            className="
              bg-white
              border
              border-gray-200
              rounded-2xl
              p-5
              shadow-sm
              hover:shadow-md
              duration-300
            "
          >
            {/* Top */}
            <div className="flex justify-between items-center">
              <p
                className="
                  text-sm
                  md:text-base
                  font-semibold
                  text-gray-500
                "
              >
                {item.title}
              </p>

              {item.icon}
            </div>

            {/* Number */}
            <h1
              className="
                text-3xl
                md:text-5xl
                font-extrabold
                mt-4
                text-gray-800
              "
            >
              {item.value}
            </h1>
          </div>
        ))}
      </main>
      <h1 className="font-extrabold text-9xl"> tweeter  :{SourceState?.Tweeter}</h1>
    </section>
  );
}