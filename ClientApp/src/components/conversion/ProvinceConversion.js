import React, { useState, useEffect } from "react";

export default ({ numProvince }) => {
  const [numProv, setNumProv] = useState(0);
  const [isBusy, setBusy] = useState(false);

  useEffect(() => {
    setNumProv(numProvince);
    numProvince != null ? setBusy(true) : setBusy(false);
  }, []);

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

  return isBusy ? (
    <React.Fragment>
      <div>{options[numProv].label} </div>
    </React.Fragment>
  ) : (
    <div></div>
  );
};
