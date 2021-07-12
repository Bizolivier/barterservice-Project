import React from 'react';

const SearchBar = () =>{
    return(
    <React.Fragment>
       <div className ="ui segment rounde d-inline-flex p-2  ">
           <div className="mx-4  ">
               <select className="ui dropdown border border-success rounded">
                   <option value="">Toutes les provinces/Belgique </option>
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
           <div className="mx-4 ">
               <select className="ui dropdown border border-success rounded">
                   <option value="">Catégories</option>
                   <option value="10">Vehicules</option>
                   <option value="9">Vacances</option>
                   <option value="8">travail</option>
                   <option value="7">Mode</option>
                   <option value="6">Maison</option>
                   <option value="5">Loisir</option>
                   <option value="4">Cours</option>
                   <option value="3">Bricolage</option>
                   <option value="2">Béauté Bien-être</option>
                   <option value="1">Aide à la personne</option>
                </select>
           </div>
        <div>
           <button className="ui orange basic button flex-row">Search</button>
           </div>
           </div>

    </React.Fragment>
    )

};
export default SearchBar