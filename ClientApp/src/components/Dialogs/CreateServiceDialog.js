import React, { useState, useEffect } from "react";

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
import * as CategoryService from "../../services/Category.Service.js";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import * as servicesService from "../../services/Services.Service.js";
import { Alert, AlertTitle } from "@material-ui/lab";
import { OutlinedInput, FormHelperText, Button } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

export default function CreateServiceDialog({
  isRequest,
  email,
  offerId,
  setOffered,
  setRequested,
  refreshComponent
}) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [catsel, setCatsel] = useState("Categories");
  const [titleService, setTitleService] = useState("Intitulé");
  const [errorTitle, setErrorTitle] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);

  const [open, setOpen] = useState(false);
  const [empty, SetEmpty] = React.useState(false);

  useEffect(() => {
    CategoryService.getAllCategories().then(res => setCategories(res));
  }, []);

  const handleChange = event => {
    setCatsel(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddService = (event) => {
    setTitleService(event.target.value);
    setErrorTitle(event.target.value == "" ? true : false);
    setUpdateDisabled(event.target.value == "" ? true : false || empty);
  };

  const handleAdd = async () => {
    if (catsel == "") {

      SetEmpty(true);
    } else {
      await servicesService.addService(titleService, catsel, offerId, isRequest);


      if (isRequest) {
        const listServicesRequest = await servicesService.getRequestedSevices(
          email
        );
        setRequested(listServicesRequest);

      } else {
        const listServicesOffered = await servicesService.getOfferedSevices(
          email
        );
        setOffered(listServicesOffered);

      }

    }
    refreshComponent();
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddCircleIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {isRequest ? (
          <DialogTitle id="alert-dialog-slide-title">
            {"Rechercher un service"}
          </DialogTitle>
        ) : (
            <DialogTitle id="alert-dialog-slide-title">
              {"Proposer un service "}
            </DialogTitle>
          )}

        <DialogContent>
          {/* <TextField
            value={titleService}
            onChange={e => {
              setTitleService(e.target.value);
            }}
            autoFocus
            margin="dense"
            id="name"
            label="Intitulé"
            type="text"
            fullWidth
          /> */}
          <form className="form-horizontal" role="form">
            <div className="my-2">
              <FormControl error={errorTitle} variant="outlined" style={{ marginRight: "20px" }}>
                <InputLabel htmlFor="component-outlined">Intitulé:</InputLabel>
                <OutlinedInput id="component-outlined" value={titleService} onChange={handleAddService} label="Intitulé" />
                {errorTitle ? <FormHelperText id="component-error-text">requis</FormHelperText> : <></>}
              </FormControl>
            </div>

            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Categories
            </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={catsel}
                onChange={handleChange}
                label="Catégorie"
              >
                <MenuItem value=""></MenuItem>
                {categories.map(cat => (
                  <MenuItem key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {empty ? <div>
              <Alert variant="outlined" color="error">
                To choose a category is required!
                   </Alert>

            </div> : <div></div>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAdd} color="primary" disabled={updateDisabled}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
