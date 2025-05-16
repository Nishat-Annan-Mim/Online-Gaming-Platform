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
import GamePage from "./pages/gamepage/GamePage"; // Import GamePage
import MatchGame from "./pages/matchgame/MatchGame"; // Import MatchGame
import Tictactoe from "./pages/tictactoepage/Tictactoe"; // Import Tictactoe
import Playonlinegame from "./pages/playonlinegame/Playonlinegame"; // Import Playonlinegame
import DownloadGame from "./pages/downloadgame/Downloadgame"; // Import DownloadGame
import Admin from "./pages/admin/Admin"; // Import the Admin component :admin
import Payment from "./pages/payment/Payment";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Profile from "./pages/profile/Profile"; // Import Profile component

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
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
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
          <Route
            path="/gamepage"
            element={authUser ? <GamePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/downloadgame"
            element={authUser ? <DownloadGame /> : <Navigate to="/login" />}
          />
          <Route
            path="/matchgame"
            element={authUser ? <MatchGame /> : <Navigate to="/login" />}
          />
          <Route
            path="/playonlinegame"
            element={authUser ? <Playonlinegame /> : <Navigate to="/login" />}
          />
          <Route
            path="/tictactoe"
            element={authUser ? <Tictactoe /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={authUser ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
            path="/payment"
            element={authUser ? <Payment /> : <Navigate to="/login" />}
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />
          {/* //admin er jonno */}
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
