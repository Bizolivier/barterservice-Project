import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as offerService from "../services/Offer.Service.js";
import * as userService from "../services/User.service.js";
import ProvinceConversion from "../components/conversion/ProvinceConversion.js";
import * as serviceService from "../services/Services.Service.js";
import { useAuth0, User } from "@auth0/auth0-react";
import * as framework from "../Framework";

const UserProfil = () => {
  const [offer, setOffer] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const [isBusy, setBusy] = useState(true);
  const [authorEmail, setAuthorEmail] = useState();
  const [userNickname, setUserNickname] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [userProvince, setUserProvince] = useState(0);
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);

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
  }, []);

  return (
    <React.Fragment>
      <div>
        <div className=" w-75  mx-5 my-3 ">
          {isBusy ? (
            <div> </div>
          ) : (
            <div className=" ui cards h-100 mb-3   ">
              <div className=" bg-white card w-75 h-75 flex-row  px-3 py-3 ">
                <div className="user mx-5">
                  {/*image*/}
                  <div className="content">
                    <div className="pull-left">
                      <div className="d-inline-flex">
                        <div className="left floated mini ui image">
                          <img
                            src={framework.IMG(userPicture)}
                            alt="{offer.author}"
                            width="200"
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
                <div className="">
                  <div className="extra content float-right ">
                    <i className="info circle icon my-4" />
                    <Link
                      className="btn btn-link text-decoration-none fs-6  text-success fw-bold my-3 "
                      to="/Chatbox"
                    >
                      Me contacter
                    </Link>
                  </div>
                  <div className="d-inline-flex">
                    <i className="info circle icon my-4" />
                    <Link
                      className="btn btn-link text-decoration-none text-success fw-bold my-3  "
                      to={`/Avis/${authorEmail}`}
                    >
                      Voir les avis
                    </Link>
                  </div>
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
