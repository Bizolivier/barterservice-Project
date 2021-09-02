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
      <div className="msg_cotainer_send min-vw-50 ">
        {msg.content}
        <span className="msg_time_send d-inline-flex">
          {framework.formatDate(msg.date)}
        </span>
      </div>
      <div className="img_cont_msg">
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
