import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchBar from '../../pages/SearchBar';
import logo from'../../images/logo_barter.PNG';
import AuthenticationButton from '../login/AuthenticationButton';

import './NavMenu.css';


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header >
        <Navbar className="navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 bg-secondary " light>
          <Container className = "pb-4 flex-row" >                                     
           
           
           
              <ul className="navbar-nav flex-row position-relative ">
              <NavbarBrand tag={Link} to="/">
              <img src = {logo}
                   alt = "BarterServ"/>
              </NavbarBrand>
                <NavItem>
                  <NavLink tag={Link} className="text-white px-3 " to="/">MainPage</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white px-3" to="/HomePage">HomePage</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white px-3" to="/CreateOffer">Publier une offre</NavLink>
                </NavItem>
                 <NavItem>
                  <NavLink tag={Link} className="text-white px-3 " to="/OfferList">Offers</NavLink>
                </NavItem>
                <NavItem>
                <AuthenticationButton/>
                </NavItem>
                
               
              </ul>
              
          
            
          </Container >
         
          <hr/> 

          <Container className = "pt-4">
            <SearchBar/>
           
          </Container>
         
         </Navbar>
        
        
         
      </header>
    );
  }
}
