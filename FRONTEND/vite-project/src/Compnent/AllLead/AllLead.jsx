// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function AllLead() {
//   const [data, setData] = useState({});
//   useEffect(() => {
//     async function feching() {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://127.0.0.1:5000/api/AllLead", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(res.data);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//     feching();
//   }, []);
//   const { totalLead } = data;
//   return (
//     <div>
//       <p>totalLead</p>
//     </div>
//   );
// }
