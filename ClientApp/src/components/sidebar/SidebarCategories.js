import React, { useState, useEffect } from "react";

import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import * as CategoryService from "../../services/Category.Service.js";

const SidebarCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.getAllCategories().then(res => setCategories(res));
  }, []);

  return (
    <>
      <Navigation
        // you can use your own router's api to get pathname
        activeItemId="/management/members"
        onSelect={({ itemId }) => {
          // maybe push to the route
        }}
        items={[
          {
            title: "Categories",
            itemId: "/Dashboard"
            // you can use your own custom Icon component as well
            // icon is optional
          },
          {
            title: "Aide à la personne",
            itemId: "/management",

            subNav: [
              {
                title: "Projects",
                itemId: "/management/projects"
              },
              {
                title: "Members",
                itemId: "/management/members"
              }
            ]
          },
          {
            title: "Beauté bien être",
            itemId: "/another",
            subNav: [
              {
                title: "Teams",
                itemId: "/management/teams"
              }
            ]
          }
        ]}
      />
    </>
  );
};
export default SidebarCategories;
