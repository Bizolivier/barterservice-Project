import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as CategorySelection from "../../services/Category.Service";

export default ({
  selectedOption,
  selectedCategoryValue,
  changeCategoryValue
}) => {
  const [categories, setCategories] = useState([{ value: 0, label: "" }]);

  useEffect(() => {
    CategorySelection.getAllCategories().then(result => {
      var tabCat = [{ value: 0, label: "Toutes les catégories" }];
      result.map((item, index) => {
        tabCat.push({ value: index + 1, label: item.name });
      });
      setCategories(tabCat);
    });
  }, []);

  const handleChange = e => {
    changeCategoryValue(e.value);
  };

  return (
    <Select
      value={categories.find(obj => obj.value === selectedCategoryValue)}
      options={categories}
      placeholder={categories[selectedOption].label}
      onChange={handleChange}
    />
  );
};
