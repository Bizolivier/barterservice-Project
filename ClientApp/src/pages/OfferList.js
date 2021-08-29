import React, { useState, useEffect } from "react";
import UserProfil from "./UserProfil";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import unknown from "../images/unknown.jpg";
import Offer from "./Offer.js";
import Category from "./Category";
import axios from "axios";
import * as offerService from "../services/Offer.Service.js";
import * as userService from "../services/User.service.js";
import * as categoryService from "../services/Category.Service.js";
import SearchBar from "../components/searchbar/SearchBar.js";
import "./OfferList.css";

const OfferList = () => {
  const [selected, onOfferSelected] = useState([]);
  const [offerz, setOfferz] = useState([]);
  const [categories, setCategories] = useState([]);
  const [busy, setBusy] = useState(false);
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    categoryService.getAllCategories().then(response => {
      setCategories(response);
    });
  }, []);

  const rendedListOffers = searchList.map(offer => {
    return (
      <React.Fragment key={offer.offerId}>
        <div className="d-inline-flex text-center">
          <Offer key={offer.id} offer={offer} />
        </div>
      </React.Fragment>
    );
  });

  return (
    <div>
      {busy ? (
        <div> </div>
      ) : (
        <div>
          <h2 className="text-center text-white fw-bolder fst-italic my-2 shadow-lg">
            Offres services disponibles
          </h2>
          <SearchBar setSearchList={setSearchList} />
          <div className="">{rendedListOffers}</div>
        </div>
      )}
    </div>
  );
};
export default OfferList;
