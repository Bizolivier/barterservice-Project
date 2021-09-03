import React from "react";
import { Container, Navbar, NavItem, NavLink } from "reactstrap";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

import AuthenticationButton from "../login/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";

import "./NavMenu.css";

export default () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <header>
      <Navbar className="  box-shadow  bg-grey" light>
        <Container className="flex-row">
          <ul className="navbar-nav flex-row position-relative ">
            <NavItem className="justify-content-center">
              <NavLink tag={Link} className="text-white px-3 vw-20" to="/">
                <img className="" src={logo} alt="name" />
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={Link}
                className="text-dark px-4 my-3 fw-bolder "
                to="/"
              >
                MainPage
              </NavLink>
            </NavItem>

            <NavItem>
              {isAuthenticated ? (
                <NavLink
                  tag={Link}
                  className="text-dark px-4 my-3 fw-bolder"
                  to="/Dashboard"
                >
                  Dashboard
                </NavLink>
              ) : (
                <div />
              )}
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                className="text-dark px-4 my-3 fw-bolder"
                to="/MyRequest"
              >
                Mes recherches
              </NavLink>
            </NavItem>
            <NavItem>
              {isAuthenticated ? (
                <NavLink
                  tag={Link}
                  className="text-dark px-4 my-3 fw-bolder"
                  to="/MyServices"
                >
                  Mes Services
                </NavLink>
              ) : (
                <div />
              )}
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                className="text-dark px-4 my-3 fw-bolder"
                to="/OfferList"
              >
                Offers
              </NavLink>
            </NavItem>
            <NavItem>
              {isAuthenticated ? (
                <NavLink
                  tag={Link}
                  className="text-dark px-4 my-3 fw-bolder"
                  to="/EditUser"
                >
                  Profil
                </NavLink>
              ) : (
                <div />
              )}
            </NavItem>
            <NavItem>
              {isAuthenticated ? (
                <NavLink
                  tag={Link}
                  className="text-dark px-4 my-3 fw-bolder"
                  to="/Chatbox"
                >
                  Chatbox
                </NavLink>
              ) : (
                <div />
              )}
            </NavItem>

            <NavItem className=" px-4 my-3">
              <AuthenticationButton />
            </NavItem>
          </ul>
        </Container>
      </Navbar>
    </header>
  );
};
