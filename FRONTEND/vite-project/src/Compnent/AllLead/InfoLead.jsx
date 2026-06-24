// import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { IoArrowBack, IoCalendarOutline } from "react-icons/io5";
import { MdOutlineSource } from "react-icons/md";

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

  const statusClasses = {
    New: "bg-blue-50 text-blue-700 ring-blue-100",
    Contacted: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    Interested: "bg-amber-50 text-amber-700 ring-amber-100",
    Inteersted: "bg-amber-50 text-amber-700 ring-amber-100",
    Follow_Up: "bg-violet-50 text-violet-700 ring-violet-100",
    Won: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Lost: "bg-rose-50 text-rose-700 ring-rose-100",
  };

  const sourceLabels = {
    from_your_frind: "Friend",
    Tweeter: "Twitter",
    Inestagram: "Instagram",
    FaceBook: "Facebook",
  };

  const createdAt = lead.createdAt
    ? new Date(lead.createdAt).toLocaleDateString("en-US", {
        timeZone: "Africa/Cairo",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No date";

  const details = [
    {
      label: "Name",
      value: lead?.name || "Unnamed lead",
      icon: <FaUser />,
    },
    {
      label: "Phone",
      value: lead?.phone || "No phone number",
      icon: <FaPhoneAlt />,
    },
    {
      label: "Email",
      value: lead?.email || "No email address",
      icon: <FaEnvelope />,
    },
    {
      label: "Source",
      value: sourceLabels[lead?.source] || lead?.source || "Unknown source",
      icon: <MdOutlineSource />,
    },
    {
      label: "Created At",
      value: createdAt,
      icon: <IoCalendarOutline />,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            to="/start/AllLead"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-placeholder shadow-sm transition hover:border-blue-200 hover:text-logo"
          >
            <IoArrowBack />
            Back to leads
          </Link>

          <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-logo">
            Lead profile
          </p>
          <h2 className="mt-1 text-3xl font-extrabold text-header">
            {lead?.name || "Lead Details"}
          </h2>
          <p className="mt-1 text-placeholdtwo">
            Review contact details and update this lead's pipeline status.
          </p>
        </div>

        <div
          className={`inline-flex min-h-11 w-fit items-center rounded-full px-4 text-sm font-bold ring-1 ${
            statusClasses[lead.status] ||
            "bg-slate-50 text-slate-700 ring-slate-100"
          }`}
        >
          {lead.status || "New"}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-line bg-white shadow-sm">
          <div className="border-b border-line p-5">
            <h3 className="text-lg font-bold text-header">Lead Information</h3>
            <p className="text-sm text-placeholdtwo">
              Main profile and contact information.
            </p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            {details.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-line bg-secondary p-4"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-logo shadow-sm">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-placeholdtwo">
                  {item.label}
                </p>
                <p className="mt-1 break-words text-base font-bold text-header">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-line bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-header">Pipeline Status</h3>
          <p className="mt-1 text-sm text-placeholdtwo">
            Change the current status for this lead.
          </p>

          <div className="mt-5 space-y-2">
            <label
              htmlFor="lead-status"
              className="text-sm font-semibold text-placeholder"
            >
              Current status
            </label>
            <select
              id="lead-status"
              value={lead.status || "New"}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="min-h-12 w-full rounded-xl border border-line bg-secondary px-4 font-semibold text-header outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Inteersted">Interested</option>
              <option value="Follow_Up">Follow Up</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div className="mt-5 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-700">Quick note</p>
            <p className="mt-1 text-sm text-blue-700">
              Status updates are saved immediately after selection.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
