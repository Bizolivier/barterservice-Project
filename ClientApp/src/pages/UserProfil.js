import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as offerService from "../services/Offer.Service.js";
import * as userService from "../services/User.service.js";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import * as serviceService from "../services/Services.Service.js";
import * as prestationService from "../services/PrestationService.js";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Button, ButtonGroup, Grid } from "@material-ui/core";
import * as framework from "../Framework";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { IconButton } from "@material-ui/core";
import GestionPrestation from "./GestionPrestation";

const UserProfil = () => {
  const [offer, setOffer] = useState([]);

  const [isBusy, setBusy] = useState(true);
  const [authorEmail, setAuthorEmail] = useState();
  const [userNickname, setUserNickname] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [userProvince, setUserProvince] = useState(0);
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);
  const [userCoId, setUserCoId] = useState(0);
  const { user, isAuthenticated } = useAuth0();

  let { email } = useParams();

  useEffect(() => {
    async function fetchData() {
      const offer = await offerService.GetOfferByEmail(email);
      setOffer(offer);

      const res = await userService.GetOneByEmail(email);
      setUserNickname(res.nickname);
      setUserProvince(res.province);
      setAuthorEmail(res.email);
      setUserPicture(res.picture);

      if (isAuthenticated) {
        const userConnected = await userService.GetOneByEmail(user.email);
        setUserCoId(userConnected.userId);
      }

      const listServicesRequest = await serviceService.getRequestedSevices(
        email
      );
      setRequested(listServicesRequest);

      const listServicesOffered = await serviceService.getOfferedSevices(email);
      setOffered(listServicesOffered);
    }

    fetchData().then(res => {
      setBusy(false);
    });
  }, [isBusy]);

  const handleClickAddPrestation = (serviceId, authorId, userCoId) => {
    const newPrestation = {
      IdServiceProvided: serviceId,
      IdUserClient: userCoId,
      IdUserProvider: authorId,
      Date: new Date(),
      Etat: 0
    };
    prestationService.addPrestation(newPrestation);

    console.log(serviceId, authorId, userCoId);
  };

  return (
    <Container>
      {!isBusy && (
        <div className=" ui cards  mb-3   ">
          <div className=" bg-white card w-100    mt-5 px-5 py-3 ">
            <div className="user mx-5 ">
              {/*banière*/}
              <div className="content d-inline-flex">
                {/* image */}
                <div className="pull-left">
                  <div className="left floated  ui image">
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={framework.IMG(userPicture)}
                      alt="{offer.author}"
                      width="200"
                      className=" rounded-circle border border-primary"
                    />
                  </div>
                </div>
                <div>
                  {/*autor */}
                  <h4 className="header flex-row ">{userNickname}</h4>
                  {/* adress*/}
                  <div className="meta flex-row">
                    <span className="small text-uppercase text-muted d-inline-flex">
                      <i className="map marker alternate icon"></i>
                      <ProvinceConversion numProvince={userProvince} />
                    </span>
                  </div>
                  <div className="d-inline-flex">
                    <Button color="primary">
                      <Link to="/Chatbox">Me contacter</Link>
                    </Button>
                    <Button color="primary">
                      <Link to={`/Avis/${authorEmail}`}>Voir les avis</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* line divider */}
              <div className="mb-4 text-right">
                <hr className="solid" />
              </div>
              <Grid container spacing={1}>
                <Grid container item xs={6} sm={6} md={6} spacing={3}>
                  {/*Array service proposés*/}
                  <div className="serviceP mx-5">
                    <h6 className="fst-italic text-primary">Je propose : </h6>
                    <ul>
                      {offered.map(item => (
                        <li
                          className="fs-6 text-capitalize"
                          key={item.serviceId}
                        >
                          {item.title}
                          {isAuthenticated ? (
                            <IconButton
                              onClick={() => {
                                handleClickAddPrestation(
                                  item.serviceId,
                                  offer.authorId,
                                  userCoId
                                );
                              }}
                            >
                              <AddShoppingCartIcon />
                            </IconButton>
                          ) : (
                            <div />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Grid>
                <Grid container item xs={6} sm={6} md={6} spacing={3}>
                  {/*Array service recherchés*/}
                  <div className="serviceR ">
                    <h6 className="fst-italic text-primary">Je recherche : </h6>
                    <ul>
                      {resquested.map(item => (
                        <li
                          className="fs-6 text-capitalize"
                          key={item.serviceId}
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="extra content px-3">
              <Link className="ui black basic button" to="/">
                back
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
export default UserProfil;
