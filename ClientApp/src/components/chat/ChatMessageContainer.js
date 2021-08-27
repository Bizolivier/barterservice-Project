import React from "react";
import "./Chat.css";

import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

export default ({ interlocutor }) => {
  const handleClickSendMessage = () => {
    console.log("un message est envoyé");
  };

  return (
    <div className="card">
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src={interlocutor.picture}
              className="rounded-circle user_img"
            />
          </div>
          <div className="user_info">
            <span>{interlocutor.nickname}</span>
            <p>1767 Messages</p>
          </div>
        </div>
      </div>
      <div className="card-body msg_card_body">
        <div class="d-flex justify-content-start mb-4">
          <div class="img_cont_msg">
            <img
              src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
              class="rounded-circle user_img_msg"
            />
          </div>
          <div class="msg_cotainer">
            Hi, how are you samim?
            <span class="msg_time">8:40 AM, Today</span>
          </div>
        </div>
        <div class="d-flex justify-content-end mb-4">
          <div class="msg_cotainer_send">
            Hi jassa i am good tnx how about you?
            <span class="msg_time_send">8:55 AM, Today</span>
          </div>
          <div class="img_cont_msg">
            <img
              src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
              class="rounded-circle user_img_msg"
            />
          </div>
        </div>
        <div class="d-flex justify-content-start mb-4">
          <div class="img_cont_msg">
            <img
              src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
              class="rounded-circle user_img_msg"
            />
          </div>
          <div class="msg_cotainer">
            I am good too, thank you for your chat template
            <span class="msg_time">9:00 AM, Today</span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="input-group">
          <textarea
            name=""
            className="form-control type_msg"
            placeholder="Type your message..."
          ></textarea>
          <div className="input-group-append ">
            <span className="input-group-append">
              <IconButton
                variant="rounded"
                color="blue"
                onClick={handleClickSendMessage}
              >
                <SendIcon />
              </IconButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
