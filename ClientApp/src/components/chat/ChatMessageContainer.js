import React, { useState, useEffect } from "react";
import "./Chat.css";
import * as framework from "../../Framework";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import Message from "./Message";
import * as chatService from "../../services/ChatService";

import { getDynamicStyles } from "jss";

export default ({ interlocutor, locutor }) => {
  const [chat, setChat] = useState();
  const [msg, setMsg] = useState();

  useEffect(() => {
    chatService
      .getChatByUsers(interlocutor.userId, locutor.userId)
      .then(res => {
        setChat(res);
      });
  }, []);

  const handleClickSendMessage = e => {
    setMsg(e.target.value);
  };
  const handleKeyUp = e => {
    if (e.key === "Enter") {
      setMsg(e.target.value);
    }
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
        {}
        <Message
          picture={locutor.picture}
          msg={`bonjour ${interlocutor.nickname} tu vas bien ?`}
          date={new Date()}
        />
        <Message
          picture={interlocutor.picture}
          msg={"oui biensur et toi ?"}
          date={new Date()}
        />
        <Message
          picture={locutor.picture}
          msg={"très trèb bien moyave"}
          date={new Date()}
        />
      </div>
      <div className="card-footer">
        <div className="input-group">
          <textarea
            name=""
            className="form-control type_msg"
            placeholder="Type your message..."
            onChange={handleClickSendMessage}
            onKeyUp={handleKeyUp}
          ></textarea>
          <div className="input-group-append ">
            <span className="input-group-append">
              <IconButton variant="rounded" color="primary" type="submit">
                <SendIcon />
              </IconButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
