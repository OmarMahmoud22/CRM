// import React from 'react'
import { TiGroup } from "react-icons/ti";
import { GrInstagram } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function Dashbourd_Agent() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function feching() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://127.0.0.1:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    feching();
  }, []);
  const { totalLead, SourceState, StatusStats } = data;
  console.log(SourceState);

  const info = [
    {
      title: "TOTAL LEADS",
      value: totalLead || 0,
      links : "/start/AllLead",
      icon: <i className="fa-solid fa-users text-logo text-xl"></i>,
    },

    {
      title: "NEW LEADS",
      value: StatusStats?.New || 0,
      links:"/start/agent-dashbourd/filter?status=New",
      icon: <i className="fa-solid fa-square-plus text-logo text-xl"></i>,
    },

    {
      title: "LOST LEADS",
      value: StatusStats?.Lost || 0,
      links:"/start/agent-dashbourd/filter?status=Lost",
      icon: <i className="fa-solid fa-circle-xmark text-red-500 text-xl"></i>,
    },

    {
      title: "WON LEADS",
      value: StatusStats?.Won || 0,
      links:"/start/agent-dashbourd/filter?status=Won",
      icon: <i className="fa-solid fa-trophy text-green-500 text-xl"></i>,
    },

    {
      title: "FOLLOW LEADS",
      value: StatusStats?.Follow_Up || 0,
      links:"/start/agent-dashbourd/filter?status=Follow_Up",
      icon: <i className="fa-solid fa-phone text-yellow-500 text-xl"></i>,
    },

    {
      title: "INTERESTED LEADS",
      value: StatusStats?.Inteersted || 0,
      links:"/start/agent-dashbourd/filter?status=Inteersted",
      icon: <i className="fa-solid fa-heart text-pink-500 text-xl"></i>,
    },

    {
      title: "CONTACTED LEADS",
      value: StatusStats?.Contacted || 0,
      links:"/start/agent-dashbourd/filter?status=Contacted",
      icon: <i className="fa-solid fa-envelope text-blue-500 text-xl"></i>,
    },
  ];

  return (
    <section className="w-full space-y-5">
      {/* Cards */}
      <main
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
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
              rounded-xl
              p-4
              sm:p-5
              shadow-sm
              hover:shadow-2xl
              duration-300
            "
          >
            {/* Top */}

            <div className="flex justify-between items-center">
              <Link
                to={item.links}
                className="
                text-xs
                sm:text-sm
                font-semibold
                text-gray-500
                "
              >
                {item.title}
              </Link>
              {/* {console.log(StatusStats.status)} */}
              {/* {console.log(item.value)} */}

              {item.icon}
            </div>

            {/* Number */}
            <h1
              className="
              text-3xl
              lg:text-4xl
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

      <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 text-placeholder shadow-sm sm:p-5 lg:grid-cols-2">
        <div className="grid gap-4">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md sm:p-5">
            <h1 className="text-lg font-extrabold sm:text-xl">From Twitter</h1>
            <div className="flex justify-between">
              <p className="mt-4 text-3xl font-extrabold text-gray-800 lg:text-4xl">
                {SourceState?.Tweeter || 0}
              </p>
              <IoLogoTwitter size={44} className="shrink-0 text-blue-500" />
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md sm:p-5">
            <h1 className="text-lg font-extrabold sm:text-xl">From Facebook</h1>
            <div className="flex justify-between">
              <p className="mt-4 text-3xl font-extrabold text-gray-800 lg:text-4xl">
                {SourceState?.FaceBook || 0}
              </p>
              <FaFacebookSquare size={44} className="shrink-0 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md sm:p-5">
            <h1 className="text-lg font-extrabold sm:text-xl">
              From Instagram
            </h1>
            <div className="flex justify-between">
              <p className="mt-4 text-3xl font-extrabold text-gray-800 lg:text-4xl">
                {SourceState?.Inestagram || 0}
              </p>
              <GrInstagram size={44} className="shrink-0 text-orange-400" />
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md sm:p-5">
            <h1 className="text-lg font-extrabold sm:text-xl">From Friend</h1>
            <div className="flex justify-between">
              <p className="mt-4 text-3xl font-extrabold text-gray-800 lg:text-4xl">
                {SourceState?.from_your_frind || 0}
              </p>
              <TiGroup size={44} className="shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
