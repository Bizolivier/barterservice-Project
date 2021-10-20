import React, { useState, useEffect } from "react";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";
import { useAuth0, User } from "@auth0/auth0-react";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import CreateServiceDialog from "../components/Dialogs/CreateServiceDialog.js";
import * as offerService from "../services/Offer.Service.js";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import barter from "../images/imageBarter.png";
import recherche from "../images/recherche.jpg";
import DeleteServiceDialog from "../components/Dialogs/DeleteServiceDialog.js";
import NavMenu from "../components/navbar/NavMenu";

import CommentIcon from '@material-ui/icons/Comment';

export default () => {
  const { user, isAuthenticated } = useAuth0();
  const [userDataProvince, setUserDataProvince] = useState(0);
  const [userNickname, setUserNickname] = useState("");
  const [email, setEmail] = useState("");
  const [isBusy, setBusy] = useState(true);
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);
  const [offer, setOffer] = useState([]);
  const [timeC, setTimeC] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    (async () => { setRequested(await serviceService.getRequestedSevices(user.email)); })();
    (async () => { setOffered(await serviceService.getOfferedSevices(user.email)); })();
    (async () => { setOffer(await offerService.GetOfferByEmail(user.email)); })();

    setBusy(false);
  }, [refresh]);

  useEffect(() => {
    userService.GetOneByEmail(user.email).then(loggedUser => {
      setUserDataProvince(loggedUser.province);
      setUserNickname(loggedUser.nickname);
      setTimeC(loggedUser.timeCredit);
    });
    setBusy(false);
  }, []);

  const refreshComponent = () => {
    setRefresh(!refresh);
  };



  return (
    <div className="">
      <div><NavMenu /></div>
      {isBusy ? (
        <div> </div>
      ) : (
          <div>
            <div style={{ "margin-left": "auto", "margin-right": "auto", "margin-top": "15px", "width": "30%" }}>
              <div className="d-inline-flex " >

                <img
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm align-items-center"
                  src={user.picture}
                  alt="name"
                />
                <div>
                  <h3 className="text-left px-2 mt-2 mx-2 align-items-center">{userNickname}</h3>

                  <div className=" d-inline-flex mt-2 mx-2 align-items-center">
                    <i className="map marker alternate icon text-primary"></i>
                    <ProvinceConversion numProvince={userDataProvince} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-inline-flex  px-2" style={{ "width": "100%" }}>
              <div className="text-center my-4" >
                <h1> Mes Services </h1>
              </div>
              <br />

              <div className="justify-content-center d-inline-flex">
                <div className="card card-custom bg-white border-white border-0 h-auto  shadow-lg mx-5  justify-content-start " style={{ "width": "50%" }}>

                  <div className="card-custom-avatar w-40 px-2 py-1 " style={{ "margin-left": "auto", "margin-right": "auto" }} >
                    <img className="img-fluid" src={barter} alt="Avatar" />
                  </div>
                  <div className="card-body">
                    <div className="d-inline-flex " style={{ "margin-left": "25%", "margin-right": "25%" }}>
                      <h4 className="card-title my-2 fst-italic text-success ">Services recherchés</h4>



                      <div className="add">
                        <CreateServiceDialog
                          isRequest={true}
                          email={user.email}
                          offerId={offer.offerId}
                          setOffered={setOffered}
                          setRequested={setRequested}
                          refreshComponent={() => refreshComponent}
                        />
                      </div>

                    </div>
                    <ul class="list-unstyled">
                      {resquested.map(item => (
                        <li className=""
                          key={item.serviceId}
                        >
                          <div className="d-inline-flex text-capitalize my-2">
                            <div style={{ "margin-top": "auto", "margin-bottom": "auto" }}>{item.title}</div>
                            <DeleteServiceDialog
                              serviceId={item.serviceId}
                              title={item.title}
                              setOffered={setOffered}
                              setRequested={setRequested}
                              refreshComponent={refreshComponent}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card card-custom bg-white border-white border-0 h-auto mx-5  justify-content-end" style={{ "width": "50%" }}>

                  <div className="card-custom-avatar w-40 px-2 py-1 " style={{ "margin-left": "auto", "margin-right": "auto" }} >
                    <img className="img-fluid" src={recherche} alt="Avatar" />
                  </div>
                  <div className="card-body my-4">
                    <div className="d-inline-flex  " style={{ "margin-left": "25%", "margin-right": "25%" }} >
                      <h4 className="card-title my-2 fst-italic text-success ">Services proposés</h4>


                      <div className="add">
                        <CreateServiceDialog
                          isRequest={false}
                          email={user.email}
                          offerId={offer.offerId}
                          setOffered={setOffered}
                          setRequested={setRequested}
                          refreshComponent={refreshComponent}
                        />
                      </div>

                    </div>
                    <ul class="list-unstyled">
                      {offered.map(item => (
                        <div className="">
                          <li className=" "
                            key={item.serviceId}
                          >
                            <div className="d-inline-flex text-capitalize my-2">
                              <div style={{ "margin-top": "auto", "margin-bottom": "auto" }}>{item.title}</div>

                              <DeleteServiceDialog
                                serviceId={item.serviceId}
                                title={item.title}
                                setOffered={setOffered}
                                setRequested={setRequested}
                                refreshComponent={refreshComponent}
                              />
                              <Link
                                className="text-dark "
                                to={`/Avis/${user.email}/${item.serviceId}`}>
                                <IconButton variant="outlined" color="primary"  >
                                  <CommentIcon />
                                </IconButton>
                              </Link>
                            </div>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      <br />
    </div>
  );
};
