import React from "react";
import * as userService from "../services/User.service.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default () => {
  var message = "";
  //permet de gerer la connection de l'utilisateur
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    const { email } = user;
    message = `Bonjour ${email}`;
    userService.connect(email).then(response => {
      console.log(response);
    });
  } else {
    message = "Bonjour inconnu";
  }

  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h1>{message} !!!</h1>
    </div>
  ) : (
    <div>
      <h1>{message} !!!</h1>
    </div>
  );
};
