import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {  NavLink } from 'reactstrap';
import "./AuthenticationButton.css";

const AuthenticationButton = () =>{

    const {loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return isAuthenticated?
    <NavLink  className ="logout px-2" onClick ={()=>logout({returnTo:window.location.origin,})}> Log Out </NavLink>:
    <NavLink className ="login px-2" onClick={()=>loginWithRedirect()}> Login </NavLink>

   
};export default AuthenticationButton;