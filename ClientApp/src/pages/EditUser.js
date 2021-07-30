import React ,{useState,useEffect}from 'react';
import * as userService from "../services/User.service.js"
import {useAuth0} from "@auth0/auth0-react";
import Avatar from '../components/avatar/Avatar.js';
import ProvinceSelection from '../components/selection/ProvinceSelection.js';
import SexeSelection from '../components/selection/SexeSelection.js';



export default () =>{
    const {user,isAuthenticated} = useAuth0();
    
  
    const [userNickname,setUserNickname] = useState("coucou")
    const [userFullname,setUserFullname] = useState("moyave")
    const [userProvince,setUserProvince] = useState(0)
    const [userSexe,setUserSexe] = useState(0)
   


 useEffect(()=>{
      
            userService.GetOneByEmail(user.email).then((loggedUser) =>{
                setUserNickname(loggedUser.nickname);
                setUserFullname(loggedUser.fullname);
                setUserProvince(loggedUser.province);
                setUserSexe(loggedUser.sexe);
              
                

            });
           
    },[])

    



  

    

   

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
                                       <input className="form-control" type="text"  onChange={(e) =>setUserNickname(e.target.value)} placeholder="Nickname" value={userNickname} />
                                     
                                    </div>
                               </div>

                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Fullname:</label>
                                       <div className="col-lg-8">
                                             <input className="form-control" type="text" onChange={(e) =>setUserFullname(e.target.value)} placeholder="Fullname" value={userFullname} />
                                            
                                        </div>
                                </div>



                               
             
                        
                                    <div className="form-group">
                                         <label className="col-lg-3 control-label">Province:</label>
                                         <div className="col-lg-8">
                                         <ProvinceSelection  selectedOption={userProvince}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                         <label className="col-lg-3 control-label">Sexe:</label>
                                         <div className="col-lg-8">
                                         <SexeSelection  selectedOption={userSexe}/>
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
};