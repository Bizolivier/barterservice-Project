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
import AuthenticationButton from "./components/login/AuthenticationButton";
import ProtectedRoute from "./auth/protected-route";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <React.Fragment>
        <Layout>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/MyRequest" component={MyRequest} />
          <Route exact path="/OfferList" component={OfferList} />
          <Route exact path="/MyServices" component={MyServices} />
          <Route exact path="/profilUser" component={UserProfil} />
          <ProtectedRoute exact path="/EditUser" component={EditUser} />
        </Layout>
      </React.Fragment>
    );
  }
}
