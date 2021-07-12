import React,{useState} from 'react';
import UserProfil from './UserProfil';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import kristy from '../images/Kristy.jpg';
import Offer from './Offer.js';



const offers=[
  {id:1, image:"../images/Kristy.jpg", address :" Liège ", author:" Aela ", serviceToProvid:[" informatique, "," Mathematique, "," jardinage "], serviceNeeded:[" demarches, "," vacances, "," cuisine "]},
  {id:2, image:"../images/bob.png",  address :" Brabant flamant ", author:" Bob " , serviceToProvid:[" photo, "," éléctricité, "," coaching "], serviceNeeded:[" ménages, "," plomberie, "," yoga "]},
  {id:3, image:"../images/ben.png",  address :" Namur ", author:" Ben " , serviceToProvid:[" entretien, "," menage, "," danse, "], serviceNeeded:[" courses, "," assistance, "," dépannage "]}]


  
  
    
    

 const OfferList =()=>{
    const[selected, onOfferSelected]= useState(offers[0])

 

  const rendedList = offers.map((offer) =>{
      return (
        <React.Fragment  key={offer.id} >
           <Offer
              key={offer.id}
              offer ={offer}
              onOfferSelected={onOfferSelected}/>
        </React.Fragment>

    
    );
  });
          return <div> 
                    <div className="ui relaxed divided list">
                       {rendedList}
                   </div>
                   <br/>
                   <Link className="ui black basic button" to="/">back</Link>
        
  </div>

   
 
};export default  OfferList; 