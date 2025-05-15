// import React from "react";

// const Playonlinegame = () => {
//   return (
//     <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
//       <iframe
//         src="https://www.htmlgames.com"
//         title="Classic Snake"
//         style={{
//           border: "none",
//           width: "100%",
//           height: "100%",
//         }}
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// };

// export default Playonlinegame;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Playonlinegame = () => {
  const [gameURL, setGameURL] = useState(null);

  useEffect(() => {
    const fetchGameURL = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/playonlinegame",
          {
            withCredentials: true,
          }
        );
        setGameURL(res.data.gameURL);
      } catch (err) {
        console.error("Failed to load game URL:", err);
      }
    };

    fetchGameURL();
  }, []);

  if (!gameURL) return <p>Loading game...</p>;

  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
      <iframe
        src={gameURL}
        title="Online Game"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Playonlinegame;
