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

const Offer = ({ offer, openService, setOpenService }) => {
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

  useEffect(() => {
    if (openService) {
      setExpandedPropose(expandedPropose);
      setExpandedRecherche(expandedRecherche);

    } else {
      setExpandedPropose(!expandedPropose);
      setExpandedRecherche(!expandedRecherche);
    }
  }, [openService]);


  const handleExpandClickPropose = () => {
    setExpandedPropose(!expandedPropose);
  };
  const handleExpandClickRecherche = () => {
    setExpandedRecherche(!expandedRecherche);
  };
  return (
    <React.Fragment>

      <div className="border border-info shadow-lg"
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
          )}
      </div>
    </React.Fragment>
  );
};
export default Offer;
