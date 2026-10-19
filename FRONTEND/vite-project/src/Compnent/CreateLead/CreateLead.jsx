import FormCreate from "./FormCreate";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateLead() {
  const navigate = useNavigate();
  const location = useLocation();

  const isStandalone = location.pathname === "/AddeLead";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("full_name");
    navigate("/");
  };

  return (
    <main className={isStandalone ? "min-h-screen bg-slate-50 px-4 py-8 font-inter" : ""}>
      {isStandalone && (
        <div className="mx-auto max-w-5xl flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
              SC
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg">SalesCore Intake</h1>
              <p className="text-xs text-slate-500">Data Entry Portal</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
          >
            Sign Out
          </button>
        </div>
      )}

      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg">
          <FormCreate />
        </div>
      </div>
    </main>
  );
}
