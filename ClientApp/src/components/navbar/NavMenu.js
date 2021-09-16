import React, { useState, useEffect } from "react";
import { Container, Navbar, NavItem, NavLink } from "reactstrap";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import AuthenticationButton from "../login/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as GestionPrestationService from "../../services/PrestationService";
import * as userService from "../../services/User.service";
import "./NavMenu.css";

export default () => {
  const { user, isAuthenticated } = useAuth0();
  const [nbNotif, setNbNotif] = useState(0);

  const StyledBadge = withStyles(theme => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px"
    }
  }))(Badge);

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const userConnected = await userService.GetOneByEmail(user.email);
        const notif = await GestionPrestationService.getNbNotifications(
          userConnected.userId
        );
        setNbNotif(notif);
      }
    }
    fetchData();
  }, [user]);

  return (
    <header>
      <Navbar className="  box-shadow  bg-grey" light>
        <Container className="flex-row  d-inline-flex">
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
                  to={`/Avis/${user.email}`}
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

            <div>
              {isAuthenticated ? (
                <NavLink
                  tag={Link}
                  className="text-dark px-4 my-3 fw-bolder"
                  to="/GestionPrestation"
                >
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={nbNotif} color="primary">
                      <NotificationsIcon />
                    </StyledBadge>
                  </IconButton>
                </NavLink>
              ) : (
                <div></div>
              )}
            </div>

            <div>
              {isAuthenticated ? (
                <div className="left floated  ui image my-3">
                  <img
                    src={user.picture}
                    alt="user"
                    width="50px"
                    className=" rounded-circle border border-primary"
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
            <NavItem className=" px-4 my-3">
              <AuthenticationButton />
            </NavItem>
          </ul>
        </Container>
      </Navbar>
    </header>
  );
};
