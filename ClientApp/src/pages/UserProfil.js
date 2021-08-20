import React, { useState, useEffect } from "react";
import kristy from "../images/Kristy.jpg";
import { Link } from "react-router-dom";
import AccordionCategories from "./AccordionCategories";
import { useHistory, useParams } from "react-router-dom";
import * as offerService from "../services/Offer.Service.js";
import * as userService from "../services/User.service.js";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import * as serviceService from "../services/Services.Service.js";
import unknown from "../images/unknown.jpg";

const UserProfil = () => {
  const [offer, setOffer] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [userNickname, setUserNickname] = useState("");
  const [userProvince, setUserProvince] = useState(0);
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);

  let { email } = useParams();
  console.log(email);

  useEffect(() => {
    offerService.GetOfferByEmail(email).then(offer => {
      setOffer(offer);

      userService.GetOneByEmail(email).then(res => {
        setUserNickname(res.nickname);
        setUserProvince(res.province);
      });
      serviceService.getRequestedSevices(email).then(listServicesRequest => {
        setRequested(listServicesRequest);
      });
      serviceService.getOfferedSevices(email).then(listServicesOffered => {
        setOffered(listServicesOffered);
      });

      console.log(userProvince);
      console.log(offer.authorId);
    });
    setBusy(false);
  }, []);

  return (
    <React.Fragment>
      <div>
        <div className=" w-75  mx-5 my-3 ">
          {isBusy ? (
            <div> </div>
          ) : (
            <div className="ui cards h-100 mb-3  ">
              <div className="card w-100  flex-row  px-3 py-3">
                <div className="user mx-5">
                  {/*image*/}
                  <div className="content">
                    <div className="pull-left">
                      <div className="d-inline-flex">
                        <div className="left floated mini ui image">
                          <img
                            src={unknown}
                            alt="{offer.author}"
                            width="100"
                            className=" rounded-circle border border-primary"
                          />
                        </div>
                      </div>

                      {/*autor */}

                      <div className="header flex-row ">{userNickname}</div>
                    </div>
                    {/* adress*/}

                    <div className="meta flex-row">
                      <span className="small text-uppercase text-muted d-inline-flex">
                        <i className="map marker alternate icon"></i>
                        <ProvinceConversion numProvince={userProvince} />
                      </span>
                    </div>
                  </div>

                  {/* line divider */}
                  <div className="mb-4 text-right">
                    <hr className="solid" />
                  </div>
                  <div className="d-inline-flex">
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
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/*Array service recherchés*/}
                    <div className="serviceR ">
                      <h6 className="fst-italic text-primary">
                        Je recherche :{" "}
                      </h6>
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
                  </div>
                </div>

                <div className="extra content float-right ">
                  <Link
                    className="btn btn-link text-decoration-none fs-6 "
                    to="/Chatbox"
                  >
                    Me contacter
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        {/*Button*/}
        <div className="extra content px-3">
          <Link className="ui black basic button" to="/">
            back
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserProfil;
