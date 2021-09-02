import React from "react";

const DateTime = () => {
  var showDate = new Date();
  var todaydate =
    showDate.getHours() +
    ":" +
    showDate.getMinutes() +
    ":" +
    showDate.getMonth();
  var dt = showDate.toDateString();

  return (
    <React.Fragment>
      <div className="d-inline-flex">
        {dt} - {todaydate}
      </div>
    </React.Fragment>
  );
};

export default DateTime;
