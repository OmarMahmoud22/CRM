// import React from 'react'
// import { FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
// import { MdOutlineSource } from "react-icons/md";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../../redux/slices/UsersSlice";
import {  FaEnvelope, FaUser } from "react-icons/fa";
// import { IoCalendarOutline } from "react-icons/io5";
// import { MdOutlineSource } from "react-icons/md";

import { Link } from "react-router-dom";
export default function InfoUser() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserInfo(id));
  }, [dispatch, id]);
  const details = [
    {
      label: "Name",
      value: user?.full_name || "Unnamed lead",
      icon: <FaUser />,
    },
    {
      label: "Role",
      value: user?.role || "No role",
      icon: <FaUser />,
    },
    {
      label: "Email",
      value: user?.email || "No email address",
      icon: <FaEnvelope />,
    },
  ];
  if (!user) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to="/start/allUsers"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-placeholder shadow-sm transition hover:border-blue-200 hover:text-logo"
            >
              <IoArrowBack />
              Back to Users
            </Link>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-logo">
              User profile
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-header">
              {user?.full_name || "User Details"}
            </h2>
            <p className="mt-1 text-placeholdtwo">
              Review contact details and update this lead's pipeline status.
            </p>
          </div>

          {/* <div
          className={`inline-flex min-h-11 w-fit items-center rounded-full px-4 text-sm font-bold ring-1 ${
            statusClasses[lead.status] ||
            "bg-slate-50 text-slate-700 ring-slate-100"
          }`}
        >
          {lead.status || "New"}
        </div> */}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-line bg-white shadow-sm">
            <div className="border-b border-line p-5">
              <h3 className="text-lg font-bold text-header">
                User Information
              </h3>
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
        </div>
      </section>
    </>
  );
}
