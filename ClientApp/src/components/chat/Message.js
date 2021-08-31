import React from "react";
import * as framework from "../../Framework";

export default ({ picture, msg, date }) => {
  return (
    <div className="d-flex justify-content-end mb-4 ">
      <div className="msg_cotainer_send min-vw-50 ">
        {msg}
        <span className="msg_time_send d-inline-flex">
          {framework.formatDate(date)}
        </span>
      </div>
      <div className="img_cont_msg">
        <img
          src={framework.IMG(picture)}
          className="rounded-circle user_img_msg"
        />
      </div>
    </div>
  );
};
