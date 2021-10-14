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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const OfferList = () => {
  const [searchList, setSearchList] = useState([]);
  const [provinceOL, setProvinceOL] = useState(-1);
  const [categorieOL, setCategorieOL] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [openService, setOpenService] = useState(true);


  useEffect(() => {
    offerService.GetOffersBySearch(searchValue, provinceOL, categorieOL).then(response => {
      setSearchList(response);
    });
  }, [provinceOL, categorieOL, searchValue]);

  const doOpen = () => {
    setOpenService(!openService);
  }




  const GridOffer = ({ searchListOnGrid }) => {
    return (
      <div>
        <FormControlLabel control={
          <Switch checked={openService}
            onChange={() => { setOpenService(!openService) }} />} label="Expand" />

        <Grid container style={{ "paddingTop": "20px" }}>
          {searchListOnGrid.map(offer => {
            return (
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
                <Offer offer={offer} openService={openService} setOpenService={setOpenService} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-center text-white fw-bolder fst-italic my-2 shadow-lg">
        Offres services disponibles
      </h2>
      <SearchBar
        provinceOL={provinceOL}
        categorieOL={categorieOL}
        setProvinceOL={setProvinceOL}
        setCategorieOL={setCategorieOL}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <GridOffer searchListOnGrid={searchList} />
    </div>
  );
};
export default OfferList;


