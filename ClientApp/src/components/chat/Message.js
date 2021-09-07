import React from "react";
import * as framework from "../../Framework";

export default ({ interlocutor, locutor, msg }) => {
  return (
    <div
      className={
        msg.senderId == locutor.userId
          ? "d-flex justify-content-start mb-4 "
          : "d-flex justify-content-end mb-4 "
      }
    >
      <div
        className={
          msg.senderId == locutor.userId
            ? "msg_cotainer_send min-vw-50 text-dark bg-light d-inline-flex"
            : "msg_cotainer_send min-vw-50 bg-success d-inline-flex"
        }
      >
        {msg.content}
        <span className="msg_time_send ">{framework.formatDate(msg.date)}</span>
      </div>
      <div className="img_cont_msg justify-content-start">
        <img
          src={
            msg.senderId == locutor.userId
              ? framework.IMG(locutor.picture)
              : framework.IMG(interlocutor.picture)
          }
          className="rounded-circle user_img_msg"
        />
      </div>
    </div>
  );
};
