import { React, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-00 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1
          className="text-3xl font-semibold text-center text-sky-300"
          style={{
            textShadow: "0 0 2px #00BFFF, 0 0 4px #1E90FF, 0 0 8px #4169E1",
            animation: "blue-glow 2s ease-in-out infinite alternate",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          Login :
          <span
            style={{
              color: "#f0f0f0", // light text
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 6px #FF0000, 0 0 12px #B22222, 0 0 25px #8B0000",
              animation: "red-sparkle 1.5s ease-in-out infinite alternate",
            }}
          >
            {" OnlineGamingPlatform"}
          </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button
              className="w-full h-10 px-3 rounded-md bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

// test page
// import { React, useState } from "react";
// import { Link } from "react-router-dom";
// import useLogin from "../../hooks/useLogin";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const { loading, login } = useLogin();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(username, password);
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-00 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1
//           className="text-3xl font-semibold text-center text-sky-300"
//           style={{
//             textShadow: "0 0 2px #00BFFF, 0 0 4px #1E90FF, 0 0 8px #4169E1",
//             animation: "blue-glow 2s ease-in-out infinite alternate",
//             fontFamily: "'Orbitron', sans-serif",
//           }}
//         >
//           Login :
//           <span
//             style={{
//               color: "#f0f0f0", // light text
//               fontFamily: "'Orbitron', sans-serif",
//               textShadow: "0 0 6px #FF0000, 0 0 12px #B22222, 0 0 25px #8B0000",
//               animation: "red-sparkle 1.5s ease-in-out infinite alternate",
//             }}
//           >
//             {" OnlineGamingPlatform"}
//           </span>
//         </h1>

//         <form onSubmit={handleSubmit}>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter username"
//               className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="label">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Link
//             to="/signup"
//             className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
//           >
//             {"Don't"} have an account?
//           </Link>

//           <div>
//             <button
//               className="w-full h-10 px-3 rounded-md bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="loading loading-spinner "></span>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Login;
