import React from "react";

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

const AccordionCategories = () =>{

    const rendedListCategories = categories.map((category) =>{
        return (
          <React.Fragment  key={category.id} >
            <div >
                <div className="ui styled accordion w-100 mx-2">
                    <div className="title">
                         <i className="dropdown icon"></i>
                             {category.name}
                    </div>
                     <div className="content">
                          <p className="transition hidden">{category.services}</p>
                    </div>
                </div>
            </div>

            




                 
    
          </React.Fragment>
    
      
      );
    });

    return(
        <div >
             {rendedListCategories}
        </div>
    )
}; export default AccordionCategories