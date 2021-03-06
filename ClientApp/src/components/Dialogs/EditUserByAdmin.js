import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { IconButton, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Alert, AlertTitle } from "@material-ui/lab";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import * as framework from "../../Framework"

import * as userService from "../../services/User.service";

import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "../avatar/Avatar";
import ProvinceSelection from "../selection/ProvinceSelection";
import SexeSelection from "../selection/SexeSelection.js";
import Snackbar from "@material-ui/core/Snackbar";
import RoleSelection from "../selection/RoleSelection"
import { OutlinedInput, FormHelperText, } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    }
}));

export default function EditUserByAdmin({ user, refreshPageAdmin

}) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [openS, setOpenS] = useState(false);
    const [selectedProvinceValue, setSelectedProvinceValue] = useState(0);
    const [selectedSexeValue, setSelectedSexeValue] = useState(user.sexe);
    const [selectedRoleValue, setSelectedRoleValue] = useState(0);
    const [userNickname, setUserNickname] = useState(user.nickname);
    const [userFullname, setUserFullname] = useState(user.fullname);
    const [userProvince, setUserProvince] = useState(user.province);
    const [userRole, setUserRole] = useState(user.role);
    const [isBusy, setBusy] = useState(true);
    const [userSexe, setUserSexe] = useState(user.sexe);
    //gestion des erreurs
    const [errorNickname, setErrorNickname] = useState(false);
    const [errorFullname, setErrorFullname] = useState(false);
    const [updateDisabled, setUpdateDisabled] = useState(false);



    useEffect(() => {
        setUserProvince(user.province);
        setUserSexe(user.sexe)
    }, []);

    // const handleChange = event => {
    //     setCatsel(event.target.value);
    // };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function changeProvinceValue(newValue) {
        setSelectedProvinceValue(newValue.value);
    }
    function changeSexeValue(newValue) {
        setSelectedSexeValue(newValue);
    }
    function changeRoleValue(newValue) {
        setSelectedRoleValue(newValue);
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
            sexe: selectedSexeValue,
            role: selectedRoleValue
        };
        (async () => {
            await userService.PutUser(user.email, newUpdatedUser);
            refreshPageAdmin();
        })();
        setOpenS(true);
        setTimeout(
            () => setOpen(false),
            3000
        );
    }

    function handleCloseAlert(event, reason) {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    }



    return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <i class="edit icon"></i>
            </IconButton>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogContent>


                    <h1>Edit user {user.nickname}</h1>
                    <div className=" ui segment bg-primary.bg-gradient">

                        <div className="container">

                            <div className="row">
                                {/* left column  */}

                                <Avatar pictureSrc={framework.IMG(user.picture)} />

                                {/* edit form column */}

                                <div className="col-md-9 personal-info">
                                    <h3>Personal info</h3>

                                    <form className="form-horizontal " role="form">

                                        <div className="d-inline-flex">
                                            <FormControl error={errorNickname} variant="outlined" style={{ marginRight: "20px", marginBottom: "20px" }}>
                                                <InputLabel htmlFor="component-outlined">Nickname:</InputLabel>
                                                <OutlinedInput id="component-outlined" value={userNickname} onChange={handleChangeNickname} label="Nickname" />
                                                {errorNickname ? <FormHelperText id="component-error-text">requis</FormHelperText> : <></>}
                                            </FormControl>


                                            <FormControl error={errorFullname} variant="outlined" >
                                                <InputLabel htmlFor="component-outlined">Fullname:</InputLabel>
                                                <OutlinedInput id="component-outlined" value={userFullname} onChange={handleChangeFullname} label="Fullname" />
                                                {errorFullname ? <FormHelperText id="component-error-text">requis</FormHelperText> : <></>}
                                            </FormControl>
                                        </div>

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
                                            <label className="col-lg-3 control-label">Role:</label>
                                            <div className="col-lg-8">
                                                <RoleSelection
                                                    selectedOption={userRole}
                                                    selectedRoleValue={selectedRoleValue}
                                                    changeRoleValue={changeRoleValue}
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
                                            <div className="col-md-8 d-inline-flex">

                                                <div className="justify-content-start mx-5 my-3">
                                                    <Button variant="contained" color="primary" size="medium"
                                                        onClick={updateUser}
                                                        disabled={updateDisabled}>
                                                        Modifier
                                                </Button>
                                                </div>
                                                <div className="justify-content-center mx-4 my-4">
                                                    <Button variant="contained" color="secondary" size="small"
                                                        onClick={() => handleClose()}>
                                                        Fermer
                                                </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <Snackbar
                                open={openS}
                                autoHideDuration={6000}
                                onClose={handleCloseAlert}
                            >
                                <Alert onClose={handleCloseAlert} severity="success">
                                    Le profil a ??t?? modifi?? avec succes
                              </Alert>
                            </Snackbar>
                        </div>

                    </div>





                </DialogContent>

            </Dialog>
        </div>
    );
}
