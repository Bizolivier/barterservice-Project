import React ,{useState,useEffect}from 'react';
import * as userService from "../services/User.service.js"
import {useAuth0} from "@auth0/auth0-react";
import Avatar from '../components/avatar/Avatar.js';


const EditUser =()=>{
    const {user,isAuthenticated} = useAuth0();
    
    const [userProfil,setUserProfil] = useState({});
    const [userNickname,setUserNickname] = useState("")
    const [userFullname,setUserFullname] = useState("")
    const [userEmail,setUserEmail] = useState("")
    const [userProvince,setUserProvince] = useState(null)
    const [userSexe,setUserSexe] = useState(null)
    const [userData , setUserData] = useState(null)



  

    

   

    return(
       
        <div className =" ui segment bg-primary.bg-gradient">
            <div className="container">
                <h1>Edit Profile</h1>
             	  <hr/>
	                <div className="row">

                          {/* left column  */} 
                          
                        <Avatar pictureSrc={user.picture}/>
      
                            {/* edit form column */} 

                        <div className="col-md-9 personal-info">
                           
                              <h3>Personal info</h3>
        
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                      <label className="col-lg-3 control-label">Nickname:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text"  onChange={(e) =>setUserNickname(e.target.value)} placeholder={user.nickname} value={userNickname}/>
                                    </div>
                               </div>

                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Fullname:</label>
                                       <div className="col-lg-8">
                                            <input className="form-control" type="text" onChange={(e) =>setUserFullname(e.target.value)} placeholder={user.name} value={userFullname}/>
                                        </div>
                                </div>
                               
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" onChange={(e) =>setUserEmail(e.target.value)} placeholder={user.email} value={userEmail}/>
                                    </div>
                                </div>
                               
                                  {/* 
                                    <div className="form-group">
                                        <label className="col-md-3 control-label">Password:</label>
                                        <div className="col-md-8">
                                            <input className="form-control" type="password" onChange={(e) =>setUserPwd(e.target.value)} placeholder="Password" value={userPwd}/>
                                         </div>
                                    </div>
                                    <div className="form-group">
                                       <label className="col-md-3 control-label">Confirm password:</label>
                                        <div className="col-md-8">
                                             <input className="form-control" type="password"  onChange={(e) =>setUserConfirmPwd(e.target.value)} placeholder="Confirm_Password" value={userConfirmPwd}/>
                                        </div>                                                                
                                    </div>

                                    */}
                                    <div className="form-group">
                                         <label className="col-lg-3 control-label">Province:</label>
                                         <div className="col-lg-8">
                                         <select class="ui dropdown form-control">
                                                <option value="">Provinces</option>
                                                <option value="10">Bruxelles</option>
                                                <option value="9">Hainaut</option>
                                                <option value="8">Namur</option>
                                                <option value="7">Brabant_flamant</option>
                                                <option value="6">Brabant_wallon</option>
                                                <option value="5">Limbourg</option>
                                                <option value="4">Luxembourg</option>
                                                <option value="3">Anvers</option>
                                                <option value="2">Flandre_orientale</option>
                                                <option value="1">Flandre_occidentale</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                         <label className="col-lg-3 control-label">Sexe:</label>
                                         <div className="col-lg-8">
                                         <select class="ui dropdown form-control">
                                                <option value="">Sexe</option>
                                                <option value="1">Male</option>
                                                <option value="0">Female</option>
                                        </select>
                                        </div>
                                    </div>
                                    

                                    <div className="form-group">
                                        <label className="col-md-3 control-label"></label>
                                        <div className="col-md-8">
                                            <input type="button" className="btn btn-primary" value="Save Changes"/>
                                            <span></span>
                                            <input type="reset" className="btn btn-default" value="Cancel"/>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            <hr></hr>
            
        </div>
       
        
     

    );
};export default EditUser