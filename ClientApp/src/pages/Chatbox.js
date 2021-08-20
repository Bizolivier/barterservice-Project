import React from "react";
import "./Chatbox.css";
import Message from "../components/chatsElements/Message";

export default () => {
  return (
    <div>
      <div class="chat_window my-5 w-25 h-75">
        <div class="top_menu">
          <div class="buttons">
            <div class="button close"></div>
            <div class="button minimize"></div>
            <div class="button maximize"></div>
          </div>
          <div class="title">Chat</div>
        </div>
        <Message />
        <ul class="messages"></ul>

        <div class="bottom_wrapper clearfix">
          <div class="message_input_wrapper">
            <input
              class="message_input"
              placeholder="Type your message here..."
            />
          </div>
          <div class="send_message w-10">
            <div class="icon"></div>
            <div class="text">Send</div>
          </div>
        </div>
      </div>
      <div class="message_template">
        <li class="message">
          <div class="avatar"></div>
          <div class="text_wrapper">
            <div class="text"></div>
          </div>
        </li>
      </div>
    </div>
  );
};
