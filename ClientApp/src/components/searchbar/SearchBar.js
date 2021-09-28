import React, { useState, useEffect } from "react";
import ProvinceSelection from "../selection/ProvinceSelection";
import CategorySelection from "../selection/CategorySelection";
import Offer from "../../pages/Offer.js";
import * as offerService from "../../services/Offer.Service.js";
import FormControl from "@material-ui/core/FormControl";

import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";


const SearchBar = ({
  provinceOL,
  categorieOL,
  searchValue,
  setProvinceOL,
  setCategorieOL,
  setSearchValue
}) => {

  const [selectedProvinceValue, setSelectedProvinceValue] = useState(
    provinceOL
  );
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(
    categorieOL
  );

  const search = () => {
    setProvinceOL(selectedProvinceValue);
    setCategorieOL(selectedCategoryValue);
  };

  const handleSearchTexte = (event) => {
    setSearchValue(event.target.value);
  };


  return (
    <React.Fragment>
      <div className=" d-inline-flex  text-center my-2 h-20 w-100 shadow-lg rounded ">
        <div>
          <TextField
            id="TextField"
            label="Search"
            value={searchValue}
            onChange={handleSearchTexte}
          />
        </div>

        <div className="w-25">
          <ProvinceSelection
            selectedOption={0}
            selectedProvinceValue={selectedProvinceValue}
            changeProvinceValue={e => setSelectedProvinceValue(e.value)}
            allProvinces={true}
          />
        </div>
        <div className="mx-4 w-25 ">
          <CategorySelection
            selectedOption={0}
            selectedCategoryValue={selectedCategoryValue}
            changeCategoryValue={e => setSelectedCategoryValue(e)}
          />
        </div>
        <div>
          <button className="ui bg-info button flex-row" onClick={search}>
            Search
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SearchBar;
