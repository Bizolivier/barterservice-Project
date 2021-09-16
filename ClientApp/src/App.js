import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./Layout";
import Dashboard from "./pages/Dashboard.js";
import MainPage from "./pages/MainPage.js";
import MyRequest from "./pages/MyRequest.js";
import OfferList from "./pages/OfferList.js";
import MyServices from "./pages/MyServices.js";
import UserProfil from "./pages/UserProfil";
import EditUser from "./pages/EditUser";
import Chatbox from "./pages/Chatbox";
import Avis from "./pages/Avis";
import ProtectedRoute from "./auth/protected-route";
import GestionPrestation from "./pages/GestionPrestation";
import NavMenu from "./components/navbar/NavMenu";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <React.Fragment>
        <Layout>
          <Route exact path="/" component={MainPage} />
          <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/MyRequest" component={MyRequest} />
          <Route exact path="/OfferList" component={OfferList} />
          <Route path="/Avis/:email" component={Avis} />
          <ProtectedRoute exact path="/MyServices" component={MyServices} />
          <Route path="/profilUser/:email" component={UserProfil} />
          <ProtectedRoute exact path="/EditUser" component={EditUser} />
          <ProtectedRoute
            exact
            path="/GestionPrestation"
            component={GestionPrestation}
          />
          <ProtectedRoute exact path="/Chatbox" component={Chatbox} />
        </Layout>
      </React.Fragment>
    );
  }
}
