import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as serviceService from "../services/Services.Service.js";
import { useAuth0, User } from "@auth0/auth0-react";
import CommentList from "../components/comments/CommentList";

const CreateOffer = () => {
  const [offeredServ, setOfferedServ] = useState([]);
  const [openPropose, setOpenPropose] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const { email } = user;

  useEffect(() => {
    async function fetchData() {
      const listServicesOffered = await serviceService.getOfferedSevices(email);
      setOfferedServ(listServicesOffered);
    }

    fetchData().then(res => {});
  }, []);

  const handleClickOpenPropose = () => {
    setOpenPropose(!openPropose);
  };

  return (
    <React.Fragment>
      <div className="border-0">
        <ul>
          {offeredServ.map(item => (
            <li
              className=" text-capitalize my-5 text-dark"
              key={item.serviceId}
            >
              <h2>{item.title} </h2>
              <i className="list icon" onClick={handleClickOpenPropose}></i>

              {openPropose && <CommentList />}
            </li>
          ))}
        </ul>

        <div>
          <Link className="ui black basic button float-right" to="/">
            back
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CreateOffer;
