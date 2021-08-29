import React from "react";
import * as userService from "../services/User.service.js";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import Chat from "../components/chat/Chat.js";

import "./MainPage.css";

export default () => {
  var message = "";
  //permet de gerer la connection de l'utilisateur
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    const { name, email, picture } = user;
    const newUser = {
      nickname: name,
      fullname: name,
      email: email,
      picture: picture,
      province: 0,
      sexe: 0
    };

    message = `Bonjour ${name}`;
    userService.connect(newUser).then(response => {});
  } else {
    message = `Welcome on BarterSerV the place to be
     Plateforme qui met en relation des particuliers de votre region ou même de plus loin pour échanger des services `;
  }

  return isAuthenticated ? (
    <div>
      <img className="my-5 rounded-circle" src={user.picture} alt={user.name} />

      <h6 className=" text-muted  fw-bold  fst-italic text-center fw-bold my-5 shadow-lg ">
        {message} !!!
      </h6>
    </div>
  ) : (
    <div>
      <h5 className=" text-muted  fw-bold  fst-italic text-center my-5 shadow-lg">
        {message} !!!
      </h5>
    </div>
  );
};
