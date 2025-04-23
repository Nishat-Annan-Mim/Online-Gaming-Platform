import React from "react";
import "./App.css";
import TalkHome from "./pages/talkHome/talkHome";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/SignUp";
import Landing from "./pages/landing/Landing"; // <-- Import Landing
import EmailSend from "./pages/emailsend/EmailSend";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div id="main-background">
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Landing /> : <Navigate to="/login" />}
          />
          <Route
            path="/talkhome"
            element={authUser ? <TalkHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/invite"
            element={authUser ? <EmailSend /> : <Navigate to="/login" />} // ✅ New route
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;

// import React from "react";
// import "./App.css";
// // import "./index.css";
// import TalkHome from "./pages/talkHome/talkHome";
// import Login from "./pages/login/login";
// import SignUp from "./pages/signup/SignUp";
// import { Navigate, Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { useAuthContext } from "./context/AuthContext";

// function App() {
//   const { authUser } = useAuthContext();
//   //ekahe talkhome er info ache
//   return (
//     <div id="main-background">
//       <div className="p-4 h-screen flex items-center justify-center">
//         <Routes>
//           {/*ami landing ad e dekhboeta
//            <Route
//             path="/signup"
//             element={authUser ? <Navigate to="/" /> : <Landing />}
//           />
//           <Route path="/" element={<Landing />} />
//           <Route path="/talkhome" element={<TalkHome />} />
//           landing connect with talkhome */}
//           <Route
//             path="/"
//             element={authUser ? <TalkHome /> : <Navigate to={"/login"} />}
//           />
//           <Route
//             path="/login"
//             element={authUser ? <Navigate to="/" /> : <Login />}
//           />
//           <Route
//             path="/signup"
//             element={authUser ? <Navigate to="/" /> : <SignUp />}
//           />
//         </Routes>
//         <Toaster />
//       </div>
//     </div>
//   );
// }

// export default App;
