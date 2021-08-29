import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as framework from "../Framework";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";
import { useAuth0 } from "@auth0/auth0-react";
import ProvinceConversion from "../components/conversion/ProvinceConversion";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

const Offer = ({ offer }) => {
 
  const [author, setAuthor] = useState();
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);
  const [openPropose, setOpenPropose] = useState(false);
  const [openRecherche, setOpenRecherche] = useState(false);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    // async functions
    async function fetchData() {
      const authorRes = await userService.GetOneById(offer.authorId);
      setAuthor(authorRes);

      const listServicesRequest = await serviceService.getRequestedSevices(
        authorRes.email
      );
      setRequested(listServicesRequest);

      const listServicesOffered = await serviceService.getOfferedSevices(
        authorRes.email
      );
      setOffered(listServicesOffered);
    }
    fetchData().then(res => {
      setBusy(false);
    });
  }, []);

  const handleClickOpenPropose = () => {
    setOpenPropose(!openPropose);
  };
  const handleClickOpenRecherche = () => {
    setOpenRecherche(!openRecherche);
  };
  return (
    <React.Fragment>
      <div className="">
        {isBusy ? (
          <div> </div>
        ) : (
          <div className="container">
            <div className="row text-center">
              <div className="col-xxl-2  mb-5 mt-5 mx-2 w-99">
                <div className=" bg-white rounded shadow-sm py-5 px-4  ">
                  <img
                    src={framework.IMG(author.picture)}
                    alt=""
                    width="100"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-1">{author.nickname}</h5>

                  <span className="small text-uppercase text-muted d-inline-flex">
                    <i className="map marker alternate icon "></i>
                    <ProvinceConversion numProvince={author.province} />
                  </span>

                  <h6 className=" fst-italic my-3 ">
                    je propose :
                    <IconButton
                      variant="outlined"
                      color="primary"
                      onClick={handleClickOpenPropose}
                    >
                      <AddIcon />
                    </IconButton>
                  </h6>
                  {openPropose && (
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
                  )}

                  <h6 className=" fst-italic my-3">
                    je recherche :
                    <IconButton
                      variant="outlined"
                      color="primary"
                      onClick={handleClickOpenRecherche}
                    >
                      <AddIcon />
                    </IconButton>
                  </h6>
                  {openRecherche && (
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
                  )}
                  <div className="extra content">
                    <Link
                      className="btn btn-link text-decoration-none "
                      to={`/profilUser/${author.email}`}
                    >
                      Profil de {author.nickname}
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
