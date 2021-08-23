import React, { useState, useEffect } from "react";
import ProvinceSelection from "../selection/ProvinceSelection";
import CategorySelection from "../selection/CategorySelection";
import * as offerService from "../../services/Offer.Service.js";

const SearchBar = () => {
  const [selectedProvinceValue, setSelectedProvinceValue] = useState(0);
  const [userProvince, setUserProvince] = useState(0);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(0);
  const [userCategory, setUserCategory] = useState(0);
  const [searchList, setSearchList] = useState([]);

  const search = () => {
    console.log(selectedProvinceValue, selectedCategoryValue);
    offerService
      .GetOffersBySearch(selectedProvinceValue, selectedCategoryValue)
      .then(listOffers => {
        setSearchList(listOffers);
      });
  };

  return (
    <React.Fragment>
      <div className=" d-inline-flex  text-center my-5 h-20 w-100 shadow-lg rounded">
        <div className="w-25">
          <ProvinceSelection
            selectedOption={userProvince}
            selectedProvinceValue={selectedProvinceValue}
            changeProvinceValue={e => setSelectedProvinceValue(e.value)}
          />
        </div>
        <div className="mx-4 w-25 ">
          <CategorySelection
            selectedOption={userCategory}
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
