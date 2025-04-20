import React from "react";
import "./App.css";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import TalkHome from "./pages/talkHome/talkHome";

function App() {
  return (
    <div id="main-background">
      <div className="p-4 h-screen flex items-center justify-center">
        <TalkHome />
        {/* <Login /> */}
      </div>
    </div>
  );
}

export default App;
