import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as serviceService from "../services/Services.Service.js";
import CommentList from "../components/comments/CommentList";

const Avis = () => {
  let { email } = useParams();
  const [offeredServ, setOfferedServ] = useState([]);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const listServicesOffered = await serviceService.getOfferedSevices(email);
      setOfferedServ(listServicesOffered);
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
            <ul>
              {offeredServ.map(item => (
                <li
                  className=" text-capitalize my-5 text-light fst-italic"
                  key={item.serviceId}
                >
                  <h2>{item.title} </h2>
                  <CommentList />
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
