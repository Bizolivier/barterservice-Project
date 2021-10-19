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
      {isBusy ? (
        <div> </div>
      ) : (
          <div className="">
            <div className=" align-items-center w-auto">
              <div className="image-container text-center w-20 px-2 mt-5 d-inline-flex">

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
            <div className="row d-inline-flex my-5 px-2">
              <div className="text-center my-4" >
                <h1> Mes Services </h1>
              </div>
              <br />

              <div className="justify-content-center d-inline-flex">
                <div className="card card-custom bg-white border-white border-0 h-auto  shadow-lg mx-5 w-auto  justify-content-start ">

                  <div className="card-custom-avatar w-40 px-2 py-1">
                    <img className="img-fluid" src={barter} alt="Avatar" />
                  </div>
                  <div className="card-body">
                    <div className="d-inline-flex">
                      <h4 className="card-title my-2 fst-italic text-success">Services recherchés</h4>

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
                            {item.title}
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



                <div className="card card-custom bg-white border-white border-0 h-auto mx-5 w-auto justify-content-end">

                  <div className="card-custom-avatar py-2 mx-1 w-40">
                    <img className="img-fluid" src={recherche} alt="Avatar" />
                  </div>
                  <div className="card-body my-4">
                    <div className="d-inline-flex">
                      <h4 className="card-title my-2 fst-italic text-success">Services proposés</h4>
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
                              {item.title}{" "}
                              <DeleteServiceDialog
                                serviceId={item.serviceId}
                                title={item.title}
                                setOffered={setOffered}
                                setRequested={setRequested}
                                refreshComponent={refreshComponent}
                              />
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
    </div>
  );
};
