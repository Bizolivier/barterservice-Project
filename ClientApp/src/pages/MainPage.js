import React from "react";
import * as userService from "../services/User.service.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import "./MainPage.css";

export default () => {
  var message = "";
  //permet de gerer la connection de l'utilisateur
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    const { email } = user;
    message = `Bonjour ${user.name}`;
    userService.connect(email).then(response => {
      console.log(response);
    });
  } else {
    message = `Welcome on BarterSer the place to be`;
  }

  return isAuthenticated ? (
    <div>
      <img className="my-5 rounded-circle" src={user.picture} alt={user.name} />
      <h1 className=" text-white text-center my-5 shadow-lg ">{message} !!!</h1>
    </div>
  ) : (
    <div>
      <h1 className=" text-white text-center my-5 shadow-lg">{message} !!!</h1>
    </div>
  );
};
