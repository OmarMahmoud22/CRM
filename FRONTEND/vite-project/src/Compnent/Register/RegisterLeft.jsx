// import React from 'react'
import ImageR from "../../assets/Toronto.jpg";

export default function RegisterLeft() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden bg-slate-950 lg:block">
      <img
        src={ImageR}
        alt="Admin registration workspace"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-br from-slate-950/80 via-slate-900/55 to-blue-950/45" />

      <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">
            Admin access only
          </p>
          <h2 className="mt-6 max-w-xl text-5xl font-extrabold leading-tight">
            Create secure team accounts for your CRM workspace.
          </h2>
        </div>

        <div className="max-w-lg rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur-md">
          <p className="text-sm leading-6 text-slate-100">
            This registration page is restricted to admins. Use it to invite
            agents, data entry members, and supervisors with the right role.
          </p>
        </div>
      </div>
    </section>
  );
}
