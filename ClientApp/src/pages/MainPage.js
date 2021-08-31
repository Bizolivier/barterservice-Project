import React from "react";
import * as userService from "../services/User.service.js";
import { useAuth0 } from "@auth0/auth0-react";
import brico from "../images/bricolage.jpg";
import aide from "../images/aide.jpg";
import car from "../images/car.jpg";
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
    userService.connect(newUser).then();
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
      <div className="d-inline-flex">
        <div className="mx-2 my-2">
          <img src={brico} alt="brico" prop="brico" />
        </div>
        <div className="mx-2 my-2 h-20">
          <img src={aide} alt="aide" prop="aide" />
        </div>
        <div className="mx-2 my-2 ">
          <img src={car} alt="car" prop="car" />
        </div>
      </div>
    </div>
  );
};
