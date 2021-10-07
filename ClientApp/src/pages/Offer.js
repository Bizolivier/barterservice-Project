import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as framework from "../Framework";
import * as userService from "../services/User.service.js";
import * as serviceService from "../services/Services.Service.js";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProvinceConversion from "../components/conversion/ProvinceConversion";

const useStyles = makeStyles(theme => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

const Offer = ({ offer }) => {
  const [author, setAuthor] = useState();
  const [resquested, setRequested] = useState([]);
  const [offered, setOffered] = useState([]);
  const [openPropose, setOpenPropose] = useState(false);
  const [openRecherche, setOpenRecherche] = useState(false);
  const [isBusy, setBusy] = useState(true);
  const classes = useStyles();
  const [expandedPropose, setExpandedPropose] = React.useState(false);

  const [expandedRecherche, setExpandedRecherche] = React.useState(false);

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
  const handleExpandClickPropose = () => {
    setExpandedPropose(!expandedPropose);
  };
  const handleExpandClickRecherche = () => {
    setExpandedRecherche(!expandedRecherche);
  };
  return (
    <React.Fragment>
      <div
        style={{
          "max-width": "300px",
          width: "300px"
        }}
      >
        {isBusy ? (
          <div> </div>
        ) : (
            <Card className={classes.root}>

              <CardHeader
                avatar={
                  <img
                    src={framework.IMG(author.picture)}
                    alt=""
                    style={{ width: "70px", height: "70px" }}
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm "
                  />
                }
                title={author.nickname}
                subheader={
                  <span className="small text-uppercase text-muted d-inline-flex">
                    <i className="map marker alternate icon text-primary"></i>
                    <ProvinceConversion numProvince={author.province} />
                  </span>
                }
              />
              <div className="extra content d-inline-flex">
                <Link
                  className="btn btn-link text-decoration-none  justify-content-end  "
                  to={`/profilUser/${author.email}`}
                >
                  Profil
              </Link>
              </div>
              {/*service proposé */}
              <CardActions disableSpacing>
                <Typography variant="h6" color="dark">
                  je propose
              </Typography>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expandedPropose
                  })}
                  onClick={handleExpandClickPropose}
                  aria-expanded={expandedPropose}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expandedPropose} timeout="auto" unmountOnExit>
                <CardContent>
                  {offered.map(item => (
                    <Typography paragraph>
                      <li className="fs-6 text-capitalize" key={item.serviceId}>
                        {item.title}
                      </li>
                    </Typography>
                  ))}
                </CardContent>
              </Collapse>
              {/*service recherché */}
              <CardActions disableSpacing>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  styles={{ padding: "20px 0px 10px 0px" }}
                >
                  je recherche
              </Typography>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expandedRecherche
                  })}
                  onClick={handleExpandClickRecherche}
                  aria-expanded={expandedRecherche}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expandedRecherche} timeout="auto" unmountOnExit>
                <CardContent>
                  {resquested.map(item => (
                    <Typography paragraph>
                      <li className="fs-6 text-capitalize" key={item.serviceId}>
                        {item.title}
                      </li>
                    </Typography>
                  ))}
                </CardContent>
              </Collapse>
            </Card>

            //------------------------------------------------------------
            /* 
            <div className=" text-center col-md-auto  mb-5 mt-5 ">
              <div className=" bg-white rounded shadow-sm py-5 px-4 ">
                <img
                  src={framework.IMG(author.picture)}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm "
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
                      <li className="fs-6 text-capitalize" key={item.serviceId}>
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
                      <li className="fs-6 text-capitalize" key={item.serviceId}>
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
   */
          )}
      </div>
    </React.Fragment>
  );
};
export default Offer;
