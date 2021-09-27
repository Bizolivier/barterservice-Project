import React, { useState, useEffect } from "react";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";
import { useAuth0, User } from "@auth0/auth0-react";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import CreateServiceDialog from "../components/Dialogs/CreateServiceDialog.js";
import * as offerService from "../services/Offer.Service.js";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import barter from "../images/imageBarter.png";
import recherche from "../images/recherche.jpg";
import DeleteServiceDialog from "../components/Dialogs/DeleteServiceDialog.js";

export default () => {
  const { user, isAuthenticated } = useAuth0();
  const [userDataProvince, setUserDataProvince] = useState(0);
  const [userNickname, setUserNickname] = useState("");
  const [isBusy, setBusy] = useState(true);
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);
  const [offer, setOffer] = useState([]);
  const [timeC, setTimeC] = useState();
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    serviceService.getRequestedSevices(user.email).then(listServicesRequest => {
      setRequested(listServicesRequest);
    });
    serviceService.getOfferedSevices(user.email).then(listServicesOffered => {
      setOffered(listServicesOffered);
    });

    offerService.GetOfferByEmail(user.email).then(offer => {
      setOffer(offer);
    });

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
    <div className=" bloc  w-75 h-75  position-relative border-rounded mt-5 ">
      {isBusy ? (
        <div> </div>
      ) : (
          <div className="ui segment   ">
            <div classname="">
              <div className="image-container text-left w-20 px-2 mt-5 d-inline-flex">
                <img
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  src={user.picture}
                  alt="name"
                />
                <div>
                  <h3 className="text-left px-2 mt-2 mx-2">{userNickname}</h3>

                  <div className=" d-inline-flex mt-2 mx-2">
                    <i className="map marker alternate icon text-primary"></i>
                    <ProvinceConversion numProvince={userDataProvince} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-inline-flex my-5 px-2 justify-content-start">


              <div className="w-25 h-100 shadow-lg mx-5">
                <div className="card card-custom bg-white border-white border-0 ">
                  <div className="card-custom-img"></div>
                  <div className="card-custom-avatar">
                    <img className="img-fluid" src={barter} alt="Avatar" />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Services recherchés</h4>
                    <CreateServiceDialog
                      isRequest={true}
                      email={user.email}
                      offerId={offer.offerId}
                      setOffered={setOffered}
                      setRequested={setRequested}
                      refreshComponent={refreshComponent}
                    />

                    <ul>
                      {resquested.map(item => (
                        <li
                          className="d-inline-flex text-capitalize"
                          key={item.serviceId}
                        >
                          {item.title}
                          <DeleteServiceDialog
                            serviceId={item.serviceId}
                            title={item.title}
                            setOffered={setOffered}
                            setRequested={setRequested}
                            refreshComponent={refreshComponent}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-25 h-100 shadow-lg"mx-5>
                <div className="card card-custom bg-white border-white border-0">
                  <div className="card-custom-img"></div>
                  <div className="card-custom-avatar">
                    <img className="img-fluid" src={recherche} alt="Avatar" />
                  </div>
                  <div className="card-body my-4">
                    <h4 className="card-title">Services proposés</h4>
                    <CreateServiceDialog
                      isRequest={false}
                      email={user.email}
                      offerId={offer.offerId}
                      setOffered={setOffered}
                      setRequested={setRequested}
                      refreshComponent={refreshComponent}
                    />
                    <ul>
                      {offered.map(item => (
                        <div className="">
                          <li
                            className="d-inline-flex text-capitalize"
                            key={item.serviceId}
                          >
                            {item.title}{" "}
                            <DeleteServiceDialog
                              serviceId={item.serviceId}
                              title={item.title}
                              setOffered={setOffered}
                              setRequested={setRequested}
                              refreshComponent={refreshComponent}
                            />
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
    </div>
  );
};
