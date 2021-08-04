import React, { Component } from "react";

const ProvinceConversion = ({ numProvince }) => {
  const options = [
    { value: 0, label: "Bruxelles" },
    { value: 1, label: "Hainaut" },
    { value: 2, label: "Namur" },
    { value: 3, label: "Brabant_flamant" },
    { value: 4, label: "Brabant_wallon" },
    { value: 5, label: "Limbourg" },
    { value: 6, label: "Luxembourg" },
    { value: 7, label: "Anvers" },
    { value: 8, label: "Flandre_orientale" },
    { value: 9, label: "Flandre_occidentale" }
  ];

  const convertirValueProvince = numProvince => {
    return numProvince == options.value ? (
      <React.Fragment>
        <div>{options.label}</div>
      </React.Fragment>
    ) : (
      <div></div>
    );
  };

  return <div>{convertirValueProvince}</div>;
};

export default ProvinceConversion;
