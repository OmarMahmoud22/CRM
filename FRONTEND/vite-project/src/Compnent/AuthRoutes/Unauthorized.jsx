import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaLock,
  FaRightToBracket,
  FaShieldHalved,
} from "react-icons/fa6";

export default function Unauthorized() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate("/start/TeamLeader");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 font-inter text-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-blue-950 to-slate-900" />
            <div className="absolute -right-24 top-16 h-64 w-64 rounded-full border border-blue-300/20" />
            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-blue-100 ring-1 ring-white/15">
                <FaShieldHalved className="text-xl" />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">
                SalesCore CRM
              </p>

              <h1 className="mt-5 max-w-md text-5xl font-extrabold leading-tight">
                Access blocked for this workspace area.
              </h1>
            </div>

            <p className="relative z-10 max-w-sm text-sm leading-6 text-slate-200">
              Your account is active, but this page needs a different role or
              permission level.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10 lg:px-14">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <FaLock className="text-3xl" />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Error 401
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
              Unauthorized access
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              You do not have permission to open this page. Go back to your
              dashboard or login with an account that has the required role.
            </p>

            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <FaArrowLeft />
                Go Back
              </button>

              <button
                type="button"
                onClick={goToLogin}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <FaRightToBracket />
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
