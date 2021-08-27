import React, { useState, useEffect } from "react";

import "./Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import * as userService from "../../services/User.service";
import ChatMessageContainer from "./ChatMessageContainer";

export default () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedInterlocutor, setSelectedInterlocutor] = useState();
  const [containerVisible, setContainerVisible] = useState(false);
  useEffect(() => {
    userService.getAll().then(res => {
      setAllUsers(res);
    });
  }, []);

  const setInterlocutor = user => {
    setSelectedInterlocutor(user);
    if (!containerVisible) setContainerVisible(true);
  };

  return (
    <div className="maincontainer my-2">
      <div className="container-fluid h-50">
        <div className="row justify-content-center h-100">
          <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
              <div className="card-header">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search..."
                    name=""
                    className="form-control search"
                  />
                </div>
              </div>
              <div className="card-body contacts_body">
                <ul className="contacts">
                  {allUsers.map(user => (
                    <li onClick={() => setInterlocutor(user)}>
                      <div class="d-flex bd-highlight">
                        <div class="img_cont">
                          <img
                            src={
                              user.picture != "vide.png"
                                ? user.picture
                                : "https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                            }
                            class="rounded-circle user_img"
                          />
                        </div>
                        <div className="user_info">
                          <span>{user.nickname}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
          <div className="col-md-8 col-xl-6 chat">
            {/* ici on affiche un chat qui correspond a l'interlocuteur selectionné */}
            {containerVisible && (
              <ChatMessageContainer interlocutor={selectedInterlocutor} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
