import React, { useState, useEffect } from "react";
import UserProfil from "./UserProfil";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import unknown from "../images/unknown.jpg";
import Offer from "./Offer.js";
import axios from "axios";
import * as offerService from "../services/Offer.Service.js";
import * as userService from "../services/User.service.js";
import * as categoryService from "../services/Category.Service.js";
import SearchBar from "../components/searchbar/SearchBar.js";
import Grid from "@material-ui/core/Grid";
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

  const rendedListOffers = (
    <div>
      <Grid container>
        {searchList.map(offer => (
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            spacing={5}
            style={{ margin: "10px 0px 10px 0px" }}
          >
            <Offer key={offer.id} offer={offer} />
          </Grid>
        ))}
      </Grid>
    </div>
  );

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
          <div style={{ "padding-top": "20px" }}>{rendedListOffers}</div>
        </div>
      )}
    </div>
  );
};
export default OfferList;
