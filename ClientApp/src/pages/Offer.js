import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import kristy from "../images/Kristy.jpg";
import { Redirect } from "react-router";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";

import ProvinceConversion from "../components/conversion/ProvinceConversion";

const Offer = ({ offer, onOfferSelected }) => {
  const [authorNickname, setAuthorNickname] = useState("");
  const [authorProvince, setAuthorProvince] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    userService.GetOneById(offer.authorId).then(res => {
      setAuthorNickname(res.nickname);
      setAuthorProvince(res.province);
      setAuthorEmail(res.email);
      setBusy(false);
      console.log(authorNickname);
    });
  }, []);

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
                    src="https://d19m59y37dris4.cloudfront.net/university/1-1-1/img/teacher-4.jpg"
                    alt=""
                    width="100"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-1">{authorNickname}</h5>
                  <span className="small text-uppercase text-muted d-inline-flex">
                    <i className="map marker alternate icon"></i>
                    <ProvinceConversion numProvince={authorProvince} />
                  </span>
                  <h6 className="my-3">je propose :</h6>

                  <h6 className="my-3">je recherche :</h6>

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
