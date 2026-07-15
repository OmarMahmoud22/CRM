// import { createContext, useContext, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const token = localStorage.getItem("token");

//     if (!token) return null;

//     try {
//       return jwtDecode(token);
//     } catch {
//       localStorage.removeItem("token");
//       return null;
//     }
//   });

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         role: user?.role?.toString().toLowerCase(),
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import socket from "../Socket/Socket"
const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
 
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  const logout = () => {
    socket.disconnect();
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <userContext.Provider
      value={{
        user,
        role: user?.role?.toString(),
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
//اختصار
export const UseAuth = () => useContext(userContext);

export default AuthContext;
