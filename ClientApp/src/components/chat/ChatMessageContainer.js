import React, { useState, useEffect } from "react";
import "./Chat.css";
import * as framework from "../../Framework";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import Message from "./Message";
import * as chatService from "../../services/ChatService";
import DateTime from "../date/DateTime";

import { getDynamicStyles } from "jss";

export default ({ interlocutor, locutor }) => {
  const [chat, setChat] = useState();
  const [messages, setMessages] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    //un refresh qui se fait toutes les 3 secondes
    const interval = setInterval(() => {
      // async functions
      async function fetchData() {
        const chat = await chatService.getChatByUsers(
          interlocutor.userId,
          locutor.userId
        );
        setChat(chat);
        setMessages(chat.messageLinkedToChat);
      }
      fetchData().then(res => {
        setBusy(false);
      });
    }, 500);
    return () => clearInterval(interval);
  }, [interlocutor, locutor]);

  const handleClickSendMessage = e => {
    e.preventDefault();
    setMsg(e.target.value);
  };

  const createMessage = () => {
    const newMessage = {
      Content: msg,
      Date: new Date(),
      SenderId: locutor.userId
    };
    chatService.addMessage(newMessage, interlocutor.userId);
  };
  const handleSubmit = event => {
    event.preventDefault();
    createMessage();
    setMsg("");
  };

  const handleKeyUp = e => {
    e.preventDefault();
    if (e.key === "Enter") {
      createMessage();
      setMsg("");
    }
  };

  return (
    <div className="">
      {isBusy ? (
        <div> </div>
      ) : (
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
              </div>
            </div>
          </div>
          <div className="card-body msg_card_body ">
            {messages.map(chatmessage => {
              return (
                <div key={chatmessage.msgId}>
                  <Message
                    interlocutor={interlocutor}
                    locutor={locutor}
                    msg={chatmessage}
                  />
                </div>
              );
            })}
          </div>
          <div className="card-footer">
            <div className="input-group">
              <textarea
                value={msg}
                className="form-control type_msg rounded-pill"
                placeholder="Type your message..."
                onChange={handleClickSendMessage}
                onKeyUp={handleKeyUp}
              ></textarea>
              <div className="input-group-append ">
                <span className="input-group-append my-4 ">
                  <IconButton
                    variant="rounded"
                    color="default"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <SendIcon />
                  </IconButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
