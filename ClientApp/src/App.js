import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import MainPage from './pages/MainPage.js';
import HomePage from './pages/HomePage.js';
import OfferList from './pages/OfferList.js';
import CreateOffer from './pages/CreateOffer.js';
import UserProfil from './pages/UserProfil';
import EditUser from './pages/EditUser';
import AuthenticationButton from './components/login/AuthenticationButton';
import ProtectedRoute from './auth/protected-route';



import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <React.Fragment>
        
      
       <Layout>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/HomePage' component={HomePage} />
        <Route exact path='/OfferList' component = {OfferList}/>
        <Route exact path='/CreateOffer' component= {CreateOffer}/>
        <Route path ='/profilUser' component ={UserProfil}/>
        <ProtectedRoute exact path = '/EditUser' component ={EditUser}/>
        
       

      
      </Layout>

       
      

      </React.Fragment>
      
      
      
      
      
    );
  }
}


