import React from 'react'
import { Link } from 'react-router-dom';
import kristy from '../images/Kristy.jpg'
import { Redirect } from 'react-router';




const Offer = ({offer,onOfferSelected}) =>{
    return(
        <React.Fragment>
            
            <div className="ui cards w-50 mx-1 my-2 ">
               <div className="card w-100   flex-row box-shadow  "> 
        
                      {/*image*/} 
                   <div className="content">
                       <div className = "pull-left" >
                            <div className="left floated mini ui image">
                                 <img src= {kristy} alt= {offer.author} />
                            </div>
                        </div>
     
                       {/*autor & adress*/}
                   <div >
                       <div className="header flex-row ">
                           <i className="user icon"></i>
                                 {offer.author}
                            </div> 

                        <div className="meta flex-row">
                             <i className="map marker alternate icon"></i>
                               {offer.address}
                        </div>
                    </div>
     
                         {/* line divider */}
                   <div className="mb-4 text-right">
                       <hr className="solid"/>
                   </div>

                         {/*Array service*/}
                    <div className="service">
                       <label className="text-success fst fst-italic" >Je propose:</label>
                          {offer.serviceToProvid}
                    </div>

                    <div className="service">
                        <label className="text-success fst fst-italic" >Je recherche:</label>
                         {offer.serviceNeeded}
                    </div>
               </div>

                          {/*Button*/}
                    <div className="extra content">
                    <Link  className="ui black basic button w-10" to = '/profilUser'>Profil de {offer.author}</Link>
                        
                    </div>
                </div>

            </div>

        </React.Fragment>
    )

}
export default Offer;