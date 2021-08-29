import React from "react";
import "./Chat.css";
import * as framework from "../../Framework";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

export default ({ interlocutor, locutor }) => {
  const handleClickSendMessage = () => {
    console.log("un message est envoyé");
  };

  return (
    <div className="card">
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src={framework.IMG(interlocutor.picture)}
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
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img
              src={framework.IMG(locutor.picture)}
              className="rounded-circle user_img_msg"
            />
          </div>
          <div className="msg_cotainer">
            Hi, how are you samim?
            <span className="msg_time">8:40 AM, Today</span>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            Hi jassa i am good tnx how about you?
            <span className="msg_time_send">8:55 AM, Today</span>
          </div>
          <div className="img_cont_msg">
            <img
              src={framework.IMG(interlocutor.picture)}
              className="rounded-circle user_img_msg"
            />
          </div>
        </div>
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img
              src={framework.IMG(locutor.picture)}
              className="rounded-circle user_img_msg"
            />
          </div>
          <div className="msg_cotainer">
            I am good too, thank you for your chat template
            <span className="msg_time">9:00 AM, Today</span>
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
                color="primary"
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
