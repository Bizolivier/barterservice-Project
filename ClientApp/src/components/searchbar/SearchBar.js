import React, { useState, useEffect } from "react";
import ProvinceSelection from "../selection/ProvinceSelection";
import CategorySelection from "../selection/CategorySelection";
import Offer from "../../pages/Offer.js";
import * as offerService from "../../services/Offer.Service.js";

const SearchBar = ({ setSearchList }) => {
  const [selectedProvinceValue, setSelectedProvinceValue] = useState(-1);
  const [userProvince, setUserProvince] = useState(0);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(0);
  const [userCategory, setUserCategory] = useState(0);

  useEffect(() => {
    offerService.getAll().then(response => {
      setSearchList(response);
    });
  }, []);

  const search = async () => {
    const listOffers = await offerService.GetOffersBySearch(
      selectedProvinceValue,
      selectedCategoryValue
    );
    setSearchList(listOffers);
  };

  return (
    <React.Fragment>
      <div className=" d-inline-flex  text-center my-2 h-20 w-100 shadow-lg rounded ">
        <div className="w-25">
          <ProvinceSelection
            selectedOption={userProvince}
            selectedProvinceValue={selectedProvinceValue}
            changeProvinceValue={e => setSelectedProvinceValue(e.value)}
            allProvinces={true}
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
