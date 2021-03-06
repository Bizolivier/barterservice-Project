import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as prestationServ from "../services/PrestationService";
import * as userService from "../services/User.service";
import { useAuth0 } from "@auth0/auth0-react";
import * as framework from "../Framework";
import { Button, IconButton } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PayementServiceDialog from "../components/Dialogs/PayementServiceDialog.js";
import GridClient from "../components/grids/GridClient";
import GridProvider from "../components/grids/GridProvider";
import NavMenu from "../components/navbar/NavMenu";




export default () => {
  const [myPrest, setMyPrest] = useState([]);
  const [aPrester, setAPrester] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const { user, isAuthenticated } = useAuth0();
  const [nicknameCo, setNicknameCo] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const userConnected = await userService.GetOneByEmail(user.email);
        setNicknameCo(userConnected.nickname);
        const prestCommande = await prestationServ.getOrdered(
          userConnected.userId
        );
        setMyPrest(prestCommande);
        const prestAPrester = await prestationServ.getProvided(userConnected.userId);
        setAPrester(prestAPrester);
      }
    }
    fetchData().then(res => {
      setBusy(false);
    });
  }, [user, refresh]);

  const refreshComponent = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="mx-5">
      <div><NavMenu key={refresh} /></div>
      {isBusy ? (
        <div> </div>
      ) : (
          <div>
            <br />
            <div className=" mx-5 text-dark text-center ">
              <h4>Mon gestionnaire de prestations</h4>
              <br />
            </div>
            <div className="fst-italic mx-5 text-success">
              <h5> Mes prestations command??es</h5>
            </div>

            <GridClient mesPresCommander={myPrest} refreshComponent={refreshComponent} nomCo={nicknameCo} />
            <br /><br />
            <div className="fst-italic mx-5 text-success ">
              <h5> Mes prestations ?? prester </h5>
            </div>

            <GridProvider mesPresAPrester={aPrester} refreshComponent={refreshComponent} nomCo={nicknameCo} />
            <br />
            <br />
          </div>


        )}
    </div>
  );
};
