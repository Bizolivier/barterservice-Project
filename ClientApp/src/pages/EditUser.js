import React, { useState, useEffect, useRef } from "react";
import * as userService from "../services/User.service.js";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "../components/avatar/Avatar.js";
import ProvinceSelection from "../components/selection/ProvinceSelection.js";
import SexeSelection from "../components/selection/SexeSelection.js";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, OutlinedInput, FormHelperText, Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';


import { Alert, AlertTitle } from "@material-ui/lab";

export default () => {
  const { user, isAuthenticated } = useAuth0();

  const [userNickname, setUserNickname] = useState("coucou");
  const [userFullname, setUserFullname] = useState("moyave");
  const [userProvince, setUserProvince] = useState(0);
  const [userSexe, setUserSexe] = useState(0);
  const [isBusy, setBusy] = useState(true);
  const [selectedProvinceValue, setSelectedProvinceValue] = useState(0);
  const [selectedSexeValue, setSelectedSexeValue] = useState(0);
  const [open, setOpen] = useState(false);

  //gestion des erreurs
  const [errorNickname, setErrorNickname] = useState(false);
  const [errorFullname, setErrorFullname] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);


  useEffect(() => {
    userService.GetOneByEmail(user.email).then(loggedUser => {
      setUserNickname(loggedUser.nickname);
      setUserFullname(loggedUser.fullname);
      setUserProvince(loggedUser.province);
      setUserSexe(loggedUser.sexe);
      setSelectedProvinceValue(loggedUser.province);
      setSelectedSexeValue(loggedUser.sexe);
      setBusy(false);
    });
  }, []);

  function changeProvinceValue(newValue) {
    setSelectedProvinceValue(newValue.value);
  }
  function changeSexeValue(newValue) {
    setSelectedSexeValue(newValue);
  }
  const handleChangeNickname = (event) => {
    setUserNickname(event.target.value);
    setErrorNickname(event.target.value == "" ? true : false);
    setUpdateDisabled(event.target.value == "" ? true : false || errorFullname);
  };
  const handleChangeFullname = (event) => {
    setUserFullname(event.target.value);
    setErrorFullname(event.target.value == "" ? true : false);
    setUpdateDisabled(errorNickname || event.target.value == "" ? true : false);
  };


  function updateUser(e) {
    e.preventDefault();

    const newUpdatedUser = {
      nickname: userNickname,
      fullname: userFullname,
      email: user.email,
      picture: user.picture,
      province: selectedProvinceValue,
      sexe: selectedSexeValue
    };

    userService.PutUser(user.email, newUpdatedUser);
    setOpen(true);
  }

  function handleCloseAlert(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <div className=" ui segment bg-primary.bg-gradient">
      {isBusy ? (
        <div> </div>
      ) : (
          <div className="container">
            <h1>Edit Profile</h1>
            <hr />
            <div className="row">
              {/* left column  */}

              <Avatar pictureSrc={user.picture} />

              {/* edit form column */}

              <div className="col-md-9 personal-info">
                <h3>Personal info</h3>

                <form className="form-horizontal" role="form">

                  <div className="my-2">
                    <FormControl error={errorNickname} variant="outlined" style={{ marginRight: "20px" }}>
                      <InputLabel htmlFor="component-outlined">Nickname:</InputLabel>
                      <OutlinedInput id="component-outlined" value={userNickname} onChange={handleChangeNickname} label="Nickname" />
                      {errorNickname ? <FormHelperText id="component-error-text">requis</FormHelperText> : <></>}
                    </FormControl>
                  </div>

                  <FormControl error={errorFullname} variant="outlined" >
                    <InputLabel htmlFor="component-outlined">Fullname:</InputLabel>
                    <OutlinedInput id="component-outlined" value={userFullname} onChange={handleChangeFullname} label="Fullname" />
                    {errorFullname ? <FormHelperText id="component-error-text">requis</FormHelperText> : <></>}
                  </FormControl>


                  <div className="form-group">
                    <label className="col-lg-3 control-label">Province:</label>
                    <div className="col-lg-8">
                      <ProvinceSelection
                        selectedOption={userProvince}
                        selectedProvinceValue={selectedProvinceValue}
                        changeProvinceValue={changeProvinceValue}
                        allProvinces={false}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-3 control-label">Sexe:</label>
                    <div className="col-lg-8">
                      <SexeSelection
                        selectedOption={userSexe}
                        selectedSexeValue={selectedSexeValue}
                        changeSexeValue={changeSexeValue}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-md-3 control-label"></label>
                    <div className="col-md-8">


                      <Button variant="contained" color="primary" size="large"
                        onClick={updateUser}
                        disabled={updateDisabled}>
                        Modifier son profil
                    </Button>
                      <span></span>
                     
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert onClose={handleCloseAlert} severity="success">
                Le profil a été modifié avec succes
            </Alert>
            </Snackbar>
          </div>
        )}
    </div>
  );
};
