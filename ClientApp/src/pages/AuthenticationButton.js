import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () =>{

    const {loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return isAuthenticated?
    <button  classname ="btn-logout" onClick ={()=>logout({returnTo:window.location.origin,})}>Log Out</button>:
    <button  className="btn" onClick={()=>loginWithRedirect()}>Login</button>

   
};export default AuthenticationButton;