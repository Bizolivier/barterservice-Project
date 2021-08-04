import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import kristy from "../images/Kristy.jpg";
import { Redirect } from "react-router";
import * as userService from "../services/User.service.js";
import ProvinceConversion from "../components/conversion/ProvinceConversion";

const Offer = ({ offer, onOfferSelected }) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    userService.GetOneById(offer.authorId).then(res => {
      setAuthor(res);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="ui cards w-35 mx-1 my-2 ">
        <div className="card w-100   flex-row box-shadow  ">
          {/*image*/}
          <div className="content">
            <div className="pull-left">
              <div className="left floated mini ui image">
                <img src={kristy} alt={offer.author} />
              </div>
            </div>

            {/*autor & adress*/}
            <div>
              <div className="header flex-row ">
                <i className="user icon"></i>
                {author.nickname}
              </div>

              <div className="meta flex-row">
                <i className="map marker alternate icon"></i>

                <ProvinceConversion numProvince={author.province} />
              </div>
            </div>

            {/* line divider */}
            <div className="mb-4 text-right">
              <hr className="solid" />
            </div>

            {/*Array service*/}
            <div className="service">
              <label className="text-success fst fst-italic">Je propose:</label>
              {offer.offerId}
            </div>

            <div className="service">
              <label className="text-success fst fst-italic">
                Je recherche:
              </label>
              {offer.serviceNeeded}
            </div>
          </div>

          {/*Button*/}
          <div className="extra content">
            <Link className="ui black basic button w-10" to="/profilUser">
              Profil de {author.nickname}
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Offer;
