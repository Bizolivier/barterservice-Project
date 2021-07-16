import React,{useState,useEffect} from 'react';
import UserProfil from './UserProfil';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import kristy from '../images/Kristy.jpg';
import Offer from './Offer.js';
import Category from './Category';
import axios  from "axios"



const offers=[
  {id:1, image:"../images/Kristy.jpg", address :" Liège ", author:" Aela ", serviceToProvid:[" informatique, "," Mathematique, "," jardinage "], serviceNeeded:[" demarches, "," vacances, "," cuisine "]},
  {id:2, image:"../images/bob.png",  address :" Brabant flamant ", author:" Bob " , serviceToProvid:[" photo, "," éléctricité, "," coaching "], serviceNeeded:[" ménages, "," plomberie, "," yoga "]},
  {id:3, image:"../images/boby.png",  address :" Liège ", author:" Boby " , serviceToProvid:[" zumba, "," velo, "," coaching "], serviceNeeded:[" peinture, "," plomberie, "," crossfit "]},
  {id:4, image:"../images/ben.png",  address :" Namur ", author:" Ben " , serviceToProvid:[" entretien, "," menage, "," danse, "], serviceNeeded:[" courses, "," assistance, "," dépannage "]}]

const categories=[
  {id:1,icon:"hand paper icon",name:"Aide à la personne",services:["co-voiturage,","course, ","démarches admin, "]},
  {id:2,icon:"smile outline icon",name:"Beauté Bien-être",services:["Coaching,","Manicure, ","Coiffure, "]},
  {id:3,icon:"wrench icon",name:"Bricolage",services:["Electricité,","Electronique, ","Maçonerie, "]},
  {id:4,icon:"university icon",name:"Cours",services:["Cuisine,","dance, ","Desssin, "]},
  {id:5,icon:"futbol icon",name:"Loisir",services:["Blu-ray,","DVD & CD, ","Couture, "]},
  {id:6,icon:"home icon",name:"Maison",services:["Ameublement,","Colocation, ","décoration, "]},
  {id:7,icon:"shopping bag icon",name:"Mode",services:["Accessoires & bagageries,","bébé & enfant,"]},
  {id:8,icon:"suitcase icon",name:"Travail",services:["Archivage,","Assistance, ","Bureau, "]},
  {id:9,icon:"sun icon ",name:"Vacances",services:["Camping,","chambres d'hotes, ","Hebergement, "]},
  {id:10,icon:"car icon",name:"Véhicules",services:["Echange,","entretien, ","Grossses Réparations, "]},
]
  
  
    
    

 const OfferList =()=>{
    const[selected, onOfferSelected]= useState(offers[0]);
    const [users,setUsers] =useState([]);

    useEffect(()=>{
      const response = async () => {

      const request  = await axios.get("https://localhost:5001/api/users");
      setUsers(request.data)
       
      };
      const timeout = setTimeout(() =>{
        response();
      },500);
      
    },[])

 

  const rendedListOffers = offers.map((offer) =>{
      return (
        <React.Fragment  key={offer.id} >
           <Offer
              key={offer.id}
              offer ={offer}
             onOfferSelected={onOfferSelected} />

        </React.Fragment>

    
    );
  });
  const rendedListUsers = users.map((user) =>{
    return (
      <React.Fragment  key={user.index} >
         <div>
         {user.nickname}
         </div>

      </React.Fragment>

  
  );
});
  


  const rendedListCategories = categories.map((category) =>{
    return (
      <React.Fragment  key={category.id} >
        <div >
            <div className=" column w-35 mx-1 my-2 shadow p-1">
                  <Category
                   key={category.id}
                  category ={category} />
             </div>
        </div>     

      </React.Fragment>

  
  );
});

          return <div > 
           
            <div className ="ui segment max-vw-100">
                    <div className="ui relaxed divided list d-inline-flex">
                       {rendedListOffers}
                   </div>
            </div>
            <div className="ui segment max-vw-100 ">
                <div className="ui five column grid">
                  {rendedListCategories}
                </div>
            </div>
                   <br/>
                   <Link className="ui black basic button" to="/">back</Link>
             <div>
               {rendedListUsers}
            </div>      
          
  </div>

   
 
};export default  OfferList; 