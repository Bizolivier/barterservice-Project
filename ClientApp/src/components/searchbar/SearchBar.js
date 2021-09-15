import React, { useState, useEffect } from "react";
import ProvinceSelection from "../selection/ProvinceSelection";
import CategorySelection from "../selection/CategorySelection";
import Offer from "../../pages/Offer.js";
import * as offerService from "../../services/Offer.Service.js";

const SearchBar = ({
  provinceOL,
  categorieOL,
  setProvinceOL,
  setCategorieOL
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

  return (
    <React.Fragment>
      <div className=" d-inline-flex  text-center my-2 h-20 w-100 shadow-lg rounded ">
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
