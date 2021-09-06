import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as serviceService from "../services/Services.Service.js";
import CommentList from "../components/comments/CommentList";
import * as userService from "../services/User.service.js";

const Avis = () => {
  let { email } = useParams();
  const [offeredServ, setOfferedServ] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [userSer, setUserSer] = useState();

  useEffect(() => {
    async function fetchData() {
      const listServicesOffered = await serviceService.getOfferedSevices(email);
      setOfferedServ(listServicesOffered);

      const userData = await userService.GetOneByEmail(email);
      setUserSer(userData);
    }
    console.log(email);
    fetchData().then(res => {
      setBusy(false);
    });
  }, []);

  return (
    <React.Fragment>
      <div>
        {isBusy ? (
          <div> </div>
        ) : (
          <div className="border-0">
            <div>
              <h3 className="text-dark text-center my-5 ">
                Avis sur prestations rendues
              </h3>
            </div>
            <ul>
              {offeredServ.map(item => (
                <li
                  className=" text-capitalize my-5 text-light fst-italic"
                  key={item.serviceId}
                >
                  <h4>{item.title} </h4>

                  <CommentList
                    serviceId={item.serviceId}
                    authorServId={userSer.userId}
                  />
                </li>
              ))}
            </ul>

            <div>
              <Link className="ui black basic button float-right" to="/">
                back
              </Link>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Avis;
