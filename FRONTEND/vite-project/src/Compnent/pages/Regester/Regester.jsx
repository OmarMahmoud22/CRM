// import React from 'react'
import RegisterForm from "../../RegisterParts/RegisterForm";
import RegisterLeft from "../../RegisterParts/RegisterLeft";

export default function Regester() {
  return (
    <main className="min-h-screen bg-slate-50 font-inter">
      <div className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
        <RegisterLeft />
        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
