import React from "react";

const Category = ({ category }) => {
  return (
    <div>
      <div className="ui card ui four column grid my-3">
        <div className="image w-100 p-3 ">
          <i className={`${category.icon}`}></i>
        </div>
        <div className="content">
          <a className="header">{category.name}</a>

          <div className="ui items">{category.services}</div>
        </div>
      </div>
    </div>
  );
};
export default Category;
