import React, { useState, useEffect } from "react";
import ProvinceSelection from "../selection/ProvinceSelection";
import CategorySelection from "../selection/CategorySelection";

const SearchBar = () => {
  const [selectedProvinceValue, setSelectedProvinceValue] = useState(0);
  const [userProvince, setUserProvince] = useState(0);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(0);
  const [userCategory, setUserCategory] = useState(0);

  const search = () => {
    console.log(selectedProvinceValue, selectedCategoryValue);
  };

  return (
    <React.Fragment>
      <div className="d-inline-flex my-5 w-100">
        <div className="w-25">
          <ProvinceSelection
            selectedOption={userProvince}
            selectedProvinceValue={selectedProvinceValue}
            changeProvinceValue={e => setSelectedProvinceValue(e.label)}
          />
        </div>
        <div className="mx-4 w-25 ">
          <CategorySelection
            selectedOption={userCategory}
            selectedCategoryValue={selectedCategoryValue}
            changeCategoryValue={e => setSelectedCategoryValue(e.label)}
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
