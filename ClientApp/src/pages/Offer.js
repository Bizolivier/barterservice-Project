import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import kristy from "../images/Kristy.jpg";
import { Redirect } from "react-router";
import * as userService from "../services/User.service.js";
import ProvinceConversion from "../components/conversion/ProvinceConversion";

const Offer = ({ offer, onOfferSelected }) => {
  const [authorNickname, setAuthorNickname] = useState("");
  const [authorProvince, setAuthorProvince] = useState("");
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    userService.GetOneById(offer.authorId).then(res => {
      setAuthorNickname(res.nickname);
      setAuthorProvince(res.province);
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
          <div className="bg-white rounded shadow-sm py-5 px-4">
            <img
              src="https://d19m59y37dris4.cloudfront.net/university/1-1-1/img/teacher-4.jpg"
              alt=""
              width="100"
              className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
            />
            <h5 className="mb-0">{authorNickname}</h5>
            <span className="small text-uppercase text-muted">
              {" "}
              <i className="map marker alternate icon"></i>
              <ProvinceConversion numProvince={authorProvince} />
            </span>
            <ul className="social mb-0 list-inline mt-3">
              <li className="list-inline-item">
                <a href="#" className="social-link">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="social-link">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="social-link">
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="social-link">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
            <div className="extra content">
              <Link
                className="btn btn-link text-decoration-none "
                to="/profilUser"
              >
                Profil de {authorNickname}
              </Link>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default Offer;
