import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchBar from '../../pages/SearchBar';
import logo from'../../images/logo_barter.PNG'

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
            <NavbarBrand tag={Link} to="/">
              <img src = {logo}
                   alt = "BarterServ"/>
              </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2 text-center" />
            <Collapse className=" flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-row position-relative ">
                <NavItem>
                  <NavLink tag={Link} className="text-success px-3 " to="/">MainPage</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-success px-3" to="/HomePage">HomePage</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-success px-3" to="/CreateOffer">Publier une offre</NavLink>
                </NavItem>
                 <NavItem>
                  <NavLink tag={Link} className="text-success px-3 " to="/OfferList">Offers</NavLink>
                </NavItem>
                
                <NavItem>
                  <NavLink tag={Link} className="text-success px-3 " to="/AuthenticationButton">Login</NavLink>
                </NavItem>
              </ul>
              
            </Collapse>
            
          </Container >
          <hr/>
          <Container  >
             
                <p className = "text-orange text-end pb-4 ">
                barterserv est une plate-forme de mise en relation qui vise à favoriser l'échange et le service. Publiez des annonces !
                <br/>
                            Echanger vos biens et vos services sans commission avec les membres de la communauté !
                </p>
          </Container>    

          <hr/> 

          <Container className = "pt-4">
            <SearchBar/>
          </Container>
         
         </Navbar>
        
        
         
      </header>
    );
  }
}
