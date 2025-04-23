import React from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
const signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  const handleCheckboxChange = (gender) => {
    setInputs({
      ...inputs,
      gender,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
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
          {" "}
          Sign Up{" "}
          <span
            style={{
              color: "#f0f0f0", // light text
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 6px #FF0000, 0 0 12px #B22222, 0 0 25px #8B0000",
              animation: "red-sparkle 1.5s ease-in-out infinite alternate",
            }}
          >
            {" Online Gaming Platform"}
          </span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="your name"
              className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="what's your username?"
              className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
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
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            href="#"
          >
            Already have an account?{" "}
          </Link>
          <div>
            {/* <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button> */}
            <button
              className="w-full h-10 px-3 rounded-md bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
            {/* <button
              type="submit"
              disabled={loading}
              className={`w-full h-10 px-3 rounded-md text-white border transition duration-200 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed border-gray-400"
                  : "bg-gray-800 hover:bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;

// page add trial
// import React from "react";
// import GenderCheckbox from "./GenderCheckbox";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import useSignup from "../../hooks/useSignup";
// const signup = () => {
//   const [inputs, setInputs] = useState({
//     fullName: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//   });
//   const { loading, signup } = useSignup();
//   const handleCheckboxChange = (gender) => {
//     setInputs({
//       ...inputs,
//       gender,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(inputs);
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
//           {" "}
//           Sign Up{" "}
//           <span
//             style={{
//               color: "#f0f0f0", // light text
//               fontFamily: "'Orbitron', sans-serif",
//               textShadow: "0 0 6px #FF0000, 0 0 12px #B22222, 0 0 25px #8B0000",
//               animation: "red-sparkle 1.5s ease-in-out infinite alternate",
//             }}
//           >
//             {" Online Gaming Platform"}
//           </span>
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Full Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="your name"
//               className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={inputs.fullName}
//               onChange={(e) =>
//                 setInputs({ ...inputs, fullName: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="what's your username?"
//               className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={inputs.username}
//               onChange={(e) =>
//                 setInputs({ ...inputs, username: e.target.value })
//               }
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
//               value={inputs.password}
//               onChange={(e) =>
//                 setInputs({ ...inputs, password: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label className="label">
//               <span className="text-base label-text">Confirm Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full h-10 px-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={inputs.confirmPassword}
//               onChange={(e) =>
//                 setInputs({ ...inputs, confirmPassword: e.target.value })
//               }
//             />
//           </div>
//           <GenderCheckbox
//             onCheckboxChange={handleCheckboxChange}
//             selectedGender={inputs.gender}
//           />
//           <Link
//             to="/login"
//             className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
//             href="#"
//           >
//             Already have an account?{" "}
//           </Link>
//           <div>
//             {/* <button
//               className="btn btn-block btn-sm mt-2 border border-slate-700"
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="loading loading-spinner"></span>
//               ) : (
//                 "Sign Up"
//               )}
//             </button> */}
//             <button
//               className="w-full h-10 px-3 rounded-md bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="loading loading-spinner"></span>
//               ) : (
//                 "Sign Up"
//               )}
//             </button>
//             {/* <button
//               type="submit"
//               disabled={loading}
//               className={`w-full h-10 px-3 rounded-md text-white border transition duration-200 ${
//                 loading
//                   ? "bg-gray-600 cursor-not-allowed border-gray-400"
//                   : "bg-gray-800 hover:bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
//               }`}
//             >
//               {loading ? "Signing Up..." : "Sign Up"}
//             </button> */}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default signup;

