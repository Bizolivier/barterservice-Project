import React, { useState, useEffect } from "react";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";
import { useAuth0, User } from "@auth0/auth0-react";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import CreateServiceDialog from "../components/Dialogs/CreateServiceDialog.js";
import * as offerService from "../services/Offer.Service.js";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./Dashboard.css";
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
      setTimeC(loggedUser.timeCredit);
    });
    setBusy(false);
  }, []);

  return (
    <div className=" bloc ui segment w-75  bg-white position-relative ">
      {isBusy ? (
        <div> </div>
      ) : (
        <div className="upper-container bg-success ">
          <div className="image-container text-left w-20 ">
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
                <i className="map marker alternate icon text-primary"></i>
                <ProvinceConversion numProvince={userDataProvince} />
              </div>
              <div className="score ui segment bg-dark py-5 text-center text-white  my-5">
                <p className="fst-italic">Vous disposez de </p>
                <h2 className="text-success fw-bolder">{timeC} </h2>
                <p className="fst-italic">Time-credits </p>
              </div>
            </div>
            <div className="col-md-4 recherche  ">
              <h4 className="fst-italic">Services recherchés</h4>
              <CreateServiceDialog
                isRequest={true}
                email={user.email}
                offerId={offer.offerId}
                setOffered={setOffered}
                setRequested={setRequested}
              />

              <ul>
                {resquested.map(item => (
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
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4 propose  px-2">
              <h4 className="fst-italic">Services proposé</h4>
              <CreateServiceDialog
                isRequest={false}
                email={user.email}
                offerId={offer.offerId}
                setOffered={setOffered}
                setRequested={setRequested}
              />
              <ul>
                {offered.map(item => (
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
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
