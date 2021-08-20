import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import unknown from "../images/unknown.jpg";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";
import { useAuth0 } from "@auth0/auth0-react";
import ProvinceConversion from "../components/conversion/ProvinceConversion";

const Offer = ({ offer }) => {
  const { user, isAuthenticated } = useAuth0();
  const [authorNickname, setAuthorNickname] = useState();
  const [authorProvince, setAuthorProvince] = useState();
  const [authorEmail, setAuthorEmail] = useState();
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);

  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    userService.GetOneById(offer.authorId).then(res => {
      setAuthorNickname(res.nickname);
      setAuthorProvince(res.province);
      setAuthorEmail(res.email);
      console.log(authorNickname);
      console.log(authorEmail);

      setBusy(false);
    });
  }, []);

  useEffect(() => {
    console.log(authorEmail);
    const allServ = () => {
      serviceService
        .getRequestedSevices(authorEmail)
        .then(listServicesRequest => {
          setRequested(listServicesRequest);
        });
      serviceService
        .getOfferedSevices(authorEmail)
        .then(listServicesOffered => {
          setOffered(listServicesOffered);
        });
    };
    const timeoutId = setTimeout(() => {
      if (authorEmail) {
        allServ();
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [authorEmail]);

  return (
    <React.Fragment>
      <div className="">
        {isBusy ? (
          <div> </div>
        ) : (
          <div className="container">
            <div className="row text-center">
              <div className="col-xxl-2  mb-5 mt-5 mx-2 w-99">
                <div className="bg-white rounded shadow-sm py-5 px-4  ">
                  <img
                    src={
                      isAuthenticated && authorEmail === user.email
                        ? user.picture
                        : unknown
                    }
                    alt=""
                    width="100"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-1">{authorNickname}</h5>

                  <span className="small text-uppercase text-muted d-inline-flex">
                    <i className="map marker alternate icon "></i>
                    <ProvinceConversion numProvince={authorProvince} />
                  </span>
                  <h6 className=" fst-italic my-3 ">je propose :</h6>
                  <ul>
                    {offered.map(item => (
                      <li className="fs-6 text-capitalize" key={item.serviceId}>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                  <h6 className=" fst-italic my-3">je recherche :</h6>
                  <ul>
                    {resquested.map(item => (
                      <li className="fs-6 text-capitalize" key={item.serviceId}>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                  <div className="extra content">
                    <Link
                      className="btn btn-link text-decoration-none "
                      to={`/profilUser/${authorEmail}`}
                    >
                      Profil de {authorNickname}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default Offer;
