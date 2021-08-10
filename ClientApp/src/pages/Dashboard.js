import React, { useState, useEffect } from "react";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";
import "./Dashboard.css";

import { useAuth0, User } from "@auth0/auth0-react";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import CreateServiceDialog from "../components/createServiceDialog/CreateServiceDialog.js";

export default () => {
  const { user, isAuthenticated } = useAuth0();
  const [userDataProvince, setUserDataProvince] = useState(0);
  const [isBusy, setBusy] = useState(true);
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);

  useEffect(() => {
    userService.GetOneByEmail(user.email).then(loggedUser => {
      setUserDataProvince(loggedUser.province);
      serviceService
        .getRequestedSevices(user.email)
        .then(listServicesRequest => {
          setRequested(listServicesRequest);
        });
      serviceService.getOfferedSevices(user.email).then(listServicesOffered => {
        setOffered(listServicesOffered);
      });

      setBusy(false);
    });
  }, []);

  return (
    <div className=" bloc ui segment w-100  bg-white ">
      {isBusy ? (
        <div> </div>
      ) : (
        <div className="upper-container ">
          <div className="image-container text-left pb-5 ">
            <img
              className="border border-secondary"
              src={user.picture}
              alt="name"
            />
          </div>
          <div className="row d-inline-flex my-5">
            <div className="col-md-4 personal-info ">
              <h3 className="text-left px-2">{user.name}</h3>
              <div className=" d-inline-flex">
                <i className="map marker alternate icon"></i>
                <ProvinceConversion numProvince={userDataProvince} />
              </div>
            </div>
            <div className="col-md-4 recherche  ">
              <h4 className="fst-italic">Services recherchés</h4>
              <CreateServiceDialog isRequest={true} />
              <ul>
                {resquested.map(item => (
                  <li>{item.title}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-4 propose  px-2">
              <h4 className="fst-italic">Services proposé</h4>
              <CreateServiceDialog isRequest={false} />
              <ul>
                {offered.map(item => (
                  <li>{item.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
