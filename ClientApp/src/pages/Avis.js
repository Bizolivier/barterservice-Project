import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as serviceService from "../services/Services.Service.js";
import CommentList from "../components/comments/CommentList";
import * as userService from "../services/User.service.js";
import * as commentServ from "../services/CommentService";
import NavMenu from "../components/navbar/NavMenu";


const Avis = () => {
  let { email, idService } = useParams();
  const [offeredServ, setOfferedServ] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [userSer, setUserSer] = useState();
  const [refresh, setRefresh] = useState(true);
  const [comt, setComt] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const ServicesOffered = await serviceService.getSingleOfferedSevices(email, idService);
      setOfferedServ(ServicesOffered);

      const listComments = await commentServ.GetCommentsByServiceId(idService);
      setComt(listComments);

      const userData = await userService.GetOneByEmail(email);
      setUserSer(userData);
    }
    console.log(email);
    fetchData().then(res => {
      setBusy(false);
    });
  }, [refresh]);

  const refreshPage = () => {
    setRefresh(!refresh);
  }

  return (

    <div>
      <div><NavMenu /></div>
      {isBusy ? (
        <div> </div>
      ) : (
          <div className="border-0">

            <h3 className="text-dark text-center my-5 ">
              Avis sur  la prestations {offeredServ.title} rendues par {userSer.nickname}
            </h3>

            <div >
              <h2 className="text-white fst-italic text-capitalize text-center">
                {offeredServ.title}
              </h2>
              <CommentList
                authorServId={userSer.userId}
                userService={userSer}
                refreshPage={refreshPage}
                comt={comt}
              />
            </div>





          </div>
        )}
      <div className="align-bottom">
        <Link className="ui black basic button align-bottom" to={`/Dashboard`}>
          back
              </Link>
      </div>
    </div>

  );
};

export default Avis;
