import React from "react";
import Chat from "../components/chat/Chat.js";
import NavMenu from "../components/navbar/NavMenu";

export default () => {
  return(<div>
    <div><NavMenu /></div>
    <Chat />;
  </div>)
};
