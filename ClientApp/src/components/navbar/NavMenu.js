import React, { Component, useState, useEffect } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import SearchBar from "../../pages/SearchBar";

import AuthenticationButton from "../login/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";

import "./NavMenu.css";

export default () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <header>
      <Navbar className="  box-shadow  bg-dark" light>
        <Container className="flex-row">
          <ul className="navbar-nav flex-row position-relative ">
            <NavItem>
              <NavLink tag={Link} className="text-white px-3 " to="/">
                MainPage
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-white px-3 " to="/Dashboard">
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-white px-3" to="/MyRequest">
                Mes recherches
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-white px-3" to="/MyServices">
                Mes Services
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-white px-3 " to="/OfferList">
                Offers
              </NavLink>
            </NavItem>
            <NavItem>
              {isAuthenticated ? (
                <NavLink tag={Link} className="text-white px-3 " to="/EditUser">
                  Profil
                </NavLink>
              ) : (
                <div />
              )}
            </NavItem>

            <NavItem>
              <AuthenticationButton />
            </NavItem>
          </ul>
        </Container>
      </Navbar>
    </header>
  );
};
