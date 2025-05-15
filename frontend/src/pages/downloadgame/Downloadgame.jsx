// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const DownloadGame = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLink = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/downloadgame/download"
//         );
//         const { url } = response.data;
//         window.location.href = url;
//       } catch (error) {
//         console.error("Failed to get download link:", error);
//         navigate("/gamepage"); // Redirect back if there's an error
//       }
//     };

//     fetchLink();
//   }, [navigate]);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <h2 className="text-4xl font-bold text-gray-800">
//         Redirecting to Google Play Store...
//       </h2>
//     </div>
//   );
// };

// export default DownloadGame;

import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DownloadGame = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToPlayStore = async () => {
      try {
        // Give a small delay to allow the message to be seen
        setTimeout(async () => {
          const response = await axios.get(
            "http://localhost:5000/api/downloadgame/download"
          );
          const { url } = response.data;
          window.open(url, "_blank");
          navigate("/gamepage"); // Redirect back to the game page
        }, 2000); // Adjust the delay as needed
      } catch (error) {
        console.error("Failed to get download link:", error);
        navigate("/gamepage"); // Redirect back if there's an error
      }
    };

    redirectToPlayStore();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center bg-[url('/path-to-your-background.jpg')]">
      <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-12 shadow-xl border border-white/30">
        <h2 className="text-4xl font-bold text-white">
          Redirecting to Google Play Store...
        </h2>
      </div>
    </div>
  );
};

export default DownloadGame;
