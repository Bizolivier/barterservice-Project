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
    message = "Bonjour et Bienvenu en Enfer !!!";
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
