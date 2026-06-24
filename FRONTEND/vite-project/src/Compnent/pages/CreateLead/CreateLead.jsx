import FormCreate from "./FormCreate";
import { useNavigate } from "react-router-dom";
export default function CreateLead() {
  const navigate = useNavigate();
  const handelNav = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    
    <main className="min-h-screen bg-[#F2F4F6] px-4 py-6 font-inter sm:px-6 lg:px-8">
    <button
            className="md:p-5 p-2 bg-red-500 text-white rounded-2xl font-bold md:text-2xl shadow-2xl mb-2"
            onClick={handelNav}
          >
            LogOut
          </button>  
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center">
        <div className="flex flex-col justify-around gap-5 relative">
          
          <FormCreate />
        </div>
      </div>
    </main>
  );
}
