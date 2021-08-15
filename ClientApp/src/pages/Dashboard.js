import React, { useState, useEffect } from "react";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";
import "./Dashboard.css";

import { useAuth0, User } from "@auth0/auth0-react";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import CreateServiceDialog from "../components/createServiceDialog/CreateServiceDialog.js";
import * as offerService from "../services/Offer.Service.js";

export default () => {
  const { user, isAuthenticated } = useAuth0();
  const [userDataProvince, setUserDataProvince] = useState(0);
  const [userNickname, setUserNickname] = useState("");
  const [isBusy, setBusy] = useState(true);
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);
  const [offer, setOffer] = useState([]);

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
  }, []);

  useEffect(() => {
    userService.GetOneByEmail(user.email).then(loggedUser => {
      setUserDataProvince(loggedUser.province);
      setUserNickname(loggedUser.nickname);
    });
    setBusy(false);
  }, []);

  function refreshOffer(newValue) {
    setOffered(newValue);
  }

  function refreshRequest(newValue) {
    setRequested(newValue);
  }

  return (
    <div className=" bloc ui segment w-100  bg-white ">
      {isBusy ? (
        <div> </div>
      ) : (
        <div className="upper-container bg-success ">
          <div className="image-container text-left pb-5 ">
            <img
              className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
              src={user.picture}
              alt="name"
            />
          </div>
          <div className="row d-inline-flex my-5">
            <div className="col-md-4 personal-info ">
              <h3 className="text-left px-2">{userNickname}</h3>
              <div className=" d-inline-flex">
                <i className="map marker alternate icon"></i>
                <ProvinceConversion numProvince={userDataProvince} />

                {userDataProvince}
              </div>
            </div>
            <div className="col-md-4 recherche  ">
              <h4 className="fst-italic">Services recherchés</h4>
              <CreateServiceDialog
                isRequest={true}
                email={user.email}
                offerId={offer.offerId}
                refreshOffer={refreshOffer}
                refreshRequest={refreshRequest}
              />
              <ul>
                {resquested.map(item => (
                  <li key={item.serviceId}>{item.title}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-4 propose  px-2">
              <h4 className="fst-italic">Services proposé</h4>
              <CreateServiceDialog
                isRequest={false}
                email={user.email}
                offerId={offer.offerId}
                refreshOffer={refreshOffer}
                refreshRequest={refreshRequest}
              />
              <ul>
                {offered.map(item => (
                  <li key={item.serviceId}>{item.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
