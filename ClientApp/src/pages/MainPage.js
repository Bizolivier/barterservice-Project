import React, { useState, useEffect } from "react";
import * as userService from "../services/User.service.js";
import { useAuth0 } from "@auth0/auth0-react";
import brico from "../images/bricolage.jpg";
import aide from "../images/aide.jpg";
import car from "../images/car.jpg";
import { Link } from "react-router-dom";
import Chat from "../components/chat/Chat.js";

import "./MainPage.css";
import { Button } from "@material-ui/core";

export default () => {
  //permet de gerer la connection de l'utilisateur
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const newUser = {
        nickname: user.name,
        fullname: user.name,
        email: user.email,
        picture: user.picture,
        province: 0,
        sexe: 0
      };


      userService.connect(newUser).then();
    }


  }, [])


  return (
    <div>
      <h5 className=" text-muted  fw-bold  fst-italic text-center my-5 shadow-lg">
        Bienvenue sur BarterSerV the place to be
Plateforme qui met en relation des particuliers de votre region ou même de plus loin pour échanger des services
        </h5>
      <div className="d-inline-flex">
        <div className="mx-2 my-2 ">
          <img src={brico} alt="brico" prop="brico" style={{ "weight": "300px" }} />
        </div>
        <div className="mx-2 my-2 ">
          <img src={aide} alt="aide" prop="aide" style={{ "weight": "300px" }} />
        </div>
        <div className="mx-2 my-2 ">
          <img src={car} alt="car" prop="car" style={{ "weight": "300px" }} />
        </div>
      </div>
      {
        isAuthenticated ?
          <div className="d-inline-flex text-center">
            <h5 style={{ "margingTop": "30px", "paddingRight": "5px" }}>Bienvenue sur BarterServ {user.name} </h5>
            <img className=" rounded-circle" src={user.picture} alt={user.name} />
            <h5 style={{ "margingTop": "30px", "paddingLeft": "5px" }}>essaye de voir les offres disponibles </h5>
          </div> :
          <div >
            <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
              Pour profiter de l'expérience BarterServ connectez vous
            </Button>
          </div>
      }

    </div>
  );
};
