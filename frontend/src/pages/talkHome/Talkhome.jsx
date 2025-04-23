import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
const TalkHome = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default TalkHome;

// page test:
// import React from "react";
// import Sidebar from "../../components/sidebar/sidebar";
// import MessageContainer from "../../components/messages/MessageContainer";
// const TalkHome = () => {
//   return (
//     <div className="flex sm:h-[450px] md:h-[550px] rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
//       <Sidebar />
//       <MessageContainer />
//     </div>
//   );
// };
// export default TalkHome;
