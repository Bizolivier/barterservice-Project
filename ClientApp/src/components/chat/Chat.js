import React, { useState, useEffect } from "react";

import "./Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import * as userService from "../../services/User.service";
import ChatMessageContainer from "./ChatMessageContainer";
import * as framework from "../../Framework";
import { useAuth0 } from "@auth0/auth0-react";

export default () => {
  const [allUsers, setAllUsers] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const [selectedInterlocutor, setSelectedInterlocutor] = useState();
  const [selectedLocutor, setSelectedLocutor] = useState();
  const [containerVisible, setContainerVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const { email } = user;

      userService.usersToChat(email).then(res => {
        setAllUsers(res);
      });
      userService.GetOneByEmail(email).then(res => {
        setSelectedLocutor(res);
      });
    }
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
                    <li key={user.userId} onClick={() => setInterlocutor(user)}>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            src={framework.IMG(user.picture)}
                            className="rounded-circle user_img"
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
              <ChatMessageContainer
                interlocutor={selectedInterlocutor}
                locutor={selectedLocutor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
