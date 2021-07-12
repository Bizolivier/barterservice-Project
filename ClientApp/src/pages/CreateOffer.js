import React from 'react';
import { Link } from 'react-router-dom';

const CreateOffer = () => {
    return (
        <React.Fragment>
            <div className =" ui segment ">
            <h4>Annonce</h4>
               <form className="ui form">
                
                    <div className="two fields">
                    
                        <div classname="field">
                            
                                <select className="ui fluid dropdown w-75 mx-4 my-2">
                                    <option value="propose">Je propose</option>
                                    <option value="recherche">je recherche</option>
                                </select>
                        </div>
                        <div className="field">
                            
                                <select className="ui fluid dropdown w-25 mx-4 my-2">
                               
                                    <option value="service">un service</option>
                                    <option value="Object">un objet</option>
                                </select>
                        </div>
                    </div>
                    <div class="field w-50">
                             <label>First Name</label>
                             <input type="text" name="first-name" placeholder="First Name"/>
                        </div>
                        <div class="field w-50">
                             <label>Last Name</label>
                             <input type="text" name="last-name" placeholder="Last Name"/>
                         </div>
              </form>
           </div>

           <div>
             <Link className="ui black basic button" to="/">back</Link>
          </div>  
        </React.Fragment>
    )


}
export default CreateOffer;