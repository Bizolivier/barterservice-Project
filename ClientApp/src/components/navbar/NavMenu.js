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
  const [userCoId, setUserCoId] = useState();
  const [userCo, setUserCo] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
        const newUser = {
          nickname: user.name,
          fullname: user.name,
          email: user.email,
          picture: user.picture,
          province: 0,
          sexe: 0
        };
        await userService.connect(newUser);
        const userConnected = await userService.GetOneByEmail(user.email);
        setUserCo(userConnected);
        const notif = await GestionPrestationService.getNbNotifications(
          userConnected.userId
        );
        setUserCoId(userConnected.userId);
        setNbNotif(notif);
      }
    }
    fetchData();
  }, [user, refresh]);

  return (
    <header>
      <Navbar className="  box-shadow  bg-grey" light>
        <Container className="flex-row  d-inline-flex">
          <ul className="navbar-nav flex-row position-relative ">
            <NavItem className="justify-content-center">
              <NavLink tag={Link} className="text-white px-3 vw-20" to="/" >
                <img className="" src={logo} alt="name" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                className="text-dark px-4 my-3 fw-bolder"
                to="/OfferList"
                onClick={() => setRefresh(!refresh)}
              >
                Toutes les offres
              </NavLink>
            </NavItem>
            {isAuthenticated ?
              <div className="d-inline-flex">
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark px-4 my-3 fw-bolder"
                    to="/Dashboard"
                    onClick={() => setRefresh(!refresh)}
                  >
                    Dashboard
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark px-4 my-3 fw-bolder"
                    to="/EditUser"
                    onClick={() => setRefresh(!refresh)}
                  >
                    Profil
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark px-4 my-3 fw-bolder"
                    to={`/profilUser/${user.email}`}
                    onClick={() => setRefresh(!refresh)}
                  >
                    Mon offre
                </NavLink>
                </NavItem>

                {userCo.role == 1 ?
                  <div className="">
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark px-4 my-3 fw-bolder"
                        to={`/GestionUser`}
                        onClick={() => setRefresh(!refresh)}
                      >
                        Gestion User
                </NavLink>
                    </NavItem>
                  </div> : <div></div>
                }


                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark px-4 my-3 fw-bolder"
                    to="/Chatbox"
                  >
                    Chatbox
                </NavLink>
                </NavItem>
                <NavLink
                  tag={Link}
                  className="text-dark px-4 my-3 fw-bolder"
                  to="/GestionPrestation"
                  onClick={() => setRefresh(!refresh)}
                >
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={nbNotif} color="primary">
                      <NotificationsIcon />
                    </StyledBadge>
                  </IconButton>
                </NavLink>
                <div className="left floated  ui image my-3">
                  <img
                    src={user.picture}
                    alt="user"
                    width="50px"
                    className=" rounded-circle border border-primary"
                  />
                </div>
              </div>
              : <div></div>}

            <NavItem className=" px-4 my-3">
              <AuthenticationButton />
            </NavItem>
          </ul>
        </Container>
      </Navbar>
    </header>
  );
};
