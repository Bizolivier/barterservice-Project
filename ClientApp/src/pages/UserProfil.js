import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as offerService from "../services/Offer.Service.js";
import * as userService from "../services/User.service.js";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import * as serviceService from "../services/Services.Service.js";
import * as prestationService from "../services/PrestationService.js";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "reactstrap";
import { Container, Button, ButtonGroup, Grid } from "@material-ui/core";
import * as framework from "../Framework";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { IconButton } from "@material-ui/core";
import OrderTheService from "../components/Dialogs/OrderTheService";
import GestionPrestation from "./GestionPrestation";
import ChatMessageContainer from "../components/chat/ChatMessageContainer";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CommentIcon from '@material-ui/icons/Comment';

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
  const [interlocut, SetInterlocuteur] = useState([]);
  const [locut, Setlocuteur] = useState([])

  const [openChat, setOpenChat] = useState(false);


  let { email } = useParams();

  useEffect(() => {
    async function fetchData() {
      const offer = await offerService.GetOfferByEmail(email);
      setOffer(offer);

      const res = await userService.GetOneByEmail(email);
      SetInterlocuteur(res);
      setUserNickname(res.nickname);
      setUserProvince(res.province);
      setAuthorEmail(res.email);
      setUserPicture(res.picture);

      if (isAuthenticated) {
        const userConnected = await userService.GetOneByEmail(user.email);
        Setlocuteur(userConnected);
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

  return (<>
    {!isBusy && (
      <Container>
        <Grid container >
          <Grid container item
            xs={7}
            sm={7}
            md={7}
            lg={7}
            spacing={5}
          >
            <div className="  chat bg-white card     mt-5  py-3 ">
              <div className="user h-auto " style={{ "margin-left": "13px" }}>
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


                      {
                        isAuthenticated && interlocut.userId != locut.userId ?
                          <FormControlLabel control={
                          <Switch checked={openChat}
                            onChange={() => { setOpenChat(!openChat) }} />} label="Contacter" /> : <div></div>
                      }

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
                    <div className="serviceP mx-2">
                      <h6 className="fst-italic text-primary">Je propose : </h6>
                      <ul>
                        {offered.map(item => (
                          <li
                            className="fs-6 text-capitalize"
                            key={item.serviceId}
                          >

                            {item.title}

                            <div className="d-inline-flex">
                              <div>

                                <Link
                                  className="text-dark my-4 "
                                  to={`/Avis/${authorEmail}/${item.serviceId}`}>
                                  <IconButton color="primary" size="small" style={{ "margin-left": "10px", "marginTop": "20px" }} >
                                    <CommentIcon />
                                  </IconButton>
                                </Link>

                              </div>
                              {isAuthenticated && interlocut.userId != locut.userId ? (<div>
                                <IconButton  >

                                  <OrderTheService userName={userNickname} serviceName={item.title} servId={item.serviceId} offerAuthorId={offer.authorId} userConnectedId={userCoId} />
                                </IconButton>


                              </div>

                              ) : (
                                  <div />
                                )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Grid>
                  <div className="ui vertical divider text-dark " style={{ "margin-top": "150px" }} ></div>
                  <Grid container item xs={6} sm={6} md={6} spacing={3}>
                    {/*Array service recherchés*/}
                    <div className="serviceR mx-5" style={{ "margin-left": "20px" }} >
                      <h6 className="fst-italic text-primary">Je recherche: </h6>
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
                <Link className="ui black basic button" to="/OfferList">
                  back
              </Link>
              </div>
            </div>

          </Grid>

          <Grid container item justify="flex-end"
            xs={5}
            sm={5}
            md={5}
            lg={5}
            spacing={5}
          >
            {openChat ?
              <div className="  chat mt-5 " >
                <ChatMessageContainer

                  interlocutor={interlocut}
                  locutor={locut}
                />
              </div>
              : <div></div>
            }
          </Grid>
        </Grid>
      </Container>
    )}</>

  );
};
export default UserProfil;
