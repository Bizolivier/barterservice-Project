import React, { useState, useEffect } from "react";
import UserProfil from "./UserProfil";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import kristy from "../images/Kristy.jpg";
import Offer from "./Offer.js";
import Category from "./Category";
import axios from "axios";
import * as offerService from "../services/Offer.Service.js";
import * as userService from "../services/User.service.js";
import * as categoryService from "../services/Category.Service.js";
import "./OfferList.css";

const OfferList = () => {
  const [selected, onOfferSelected] = useState([]);
  const [offerz, setOfferz] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    offerService.getAll().then(response => {
      setOfferz(response);
      console.log(response);
    });
  }, []);

  useEffect(() => {
    categoryService.getAllCategories().then(response => {
      setCategories(response);
      console.log(response);
    });
  }, []);

  const rendedListOffers = offerz.map(offer => {
    return (
      <React.Fragment key={offer.offerId}>
        <div className="d-inline-flex">
          <Offer key={offer.id} offer={offer} />
        </div>
      </React.Fragment>
    );
  });

  const rendedOffers = offerz.map(offa => {
    return (
      <React.Fragment key={offa.offerId}>
        <div>
          {offa.offerId}
          {offa.ServicesLinkedToOffer}
        </div>
      </React.Fragment>
    );
  });

  const rendedListCategories = categories.map(category => {
    return (
      <React.Fragment key={category.categoryId}>
        <div>
          <div className=" column w-35 mx-1 my-2 shadow p-1">
            <Category key={category.id} category={category} />
          </div>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div>
      <div className="">{rendedListOffers}</div>

      <div className="ui segment max-vw-100 ">
        <div className="ui five column grid">{rendedListCategories}</div>
      </div>

      <Link className="ui black basic button" to="/">
        back
      </Link>

      <div>{rendedOffers}</div>
    </div>
  );
};
export default OfferList;
