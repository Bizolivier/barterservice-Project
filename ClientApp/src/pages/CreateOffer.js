import React from 'react';
import { Link } from 'react-router-dom';

const CreateOffer = () => {
    return (
        <React.Fragment>
            <div className =" ui segment w-75 ">
            <h4> Votre Annonce</h4>
               <form className="ui form">
                
                    <div className="two fields">
                    
                        <div className="field">
                            
                                <select className="ui fluid dropdown w-26  my-2">
                                    <option value="propose">Je propose</option>
                                    <option value="recherche">je recherche</option>
                                </select>
                        </div>
                        <div className="field">
                            
                                <select className="ui fluid dropdown w-26 mx-1 my-2">
                               
                                    <option value="service">un service</option>
                                    <option value="Object">un objet</option>
                                </select>
                        </div>
                    </div>
                    <div className="field w-50">
                             <label>Nom du service ou du bien</label>
                             <input type="text" name="first-name"/>
                        </div>
                        <div className="field w-50">
                             <label>Description</label>
                             <textarea type="text" name="last-name" />
                         </div>
                         <div className="w-50">
                             <label>Choisissez une image</label>
                                <input type="file"/>
                             
                        </div>
              </form>
           </div>
           <div className =" ui segment w-75   ">
               <label className="m-2">Zone géographique</label>
               <select className="ui dropdown  align-bottom rounded">
                   <option value="">Choisissez votre province </option>
                   <option value="10">Bruxelles</option>
                   <option value="9">Hainaut</option>
                   <option value="8">Namur</option>
                   <option value="7">Brabant flamant</option>
                   <option value="6">Brabant wallon</option>
                   <option value="5">Limbourg</option>
                   <option value="4">Luxembourg</option>
                   <option value="3">Anvers</option>
                   <option value="2">Flandre orientale</option>
                   <option value="1">flandre occidentale</option>
                   
                </select>

           </div>
           <div>
           <button className="ui green button align-center"> Publier</button>
           </div>

           <div>
             <Link className="ui black basic button float-right" to="/">back</Link>
          </div>  
        </React.Fragment>
    )


}
export default CreateOffer;