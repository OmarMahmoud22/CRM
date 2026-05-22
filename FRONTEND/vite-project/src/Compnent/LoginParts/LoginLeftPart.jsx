// import React from 'react'
import BuldImage from "../../assets/MY_GIRL_FF_JK.jpg";

export default function LoginLeftPart() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden bg-slate-900 lg:block">
      <img
        src={BuldImage}
        alt="SalesCore workspace"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-br from-slate-950/75 via-slate-900/35 to-blue-900/45" />

      <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">
            SalesCore CRM
          </p>
          <h2 className="mt-6 max-w-xl text-5xl font-extrabold leading-tight">
            Manage every customer conversation from one focused dashboard.
          </h2>
        </div>

        <div className="max-w-lg rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur-md">
          <p className="text-sm leading-6 text-slate-100">
            Track leads, follow up faster, and keep your team aligned with a
            secure enterprise workspace.
          </p>
        </div>
      </div>
    </section>
  );
}
