import React,{useState ,useEffect} from 'react';
import kristy from '../images/Kristy.jpg';
import { Link } from 'react-router-dom';
import AccordionCategories from './AccordionCategories';




const UserProfil = () => {

   /* const {profilUser} = useParams();
    const location = useLocation()
    const {offer} = location.state
    const [user,setUser] = useState(null)


    useEffect(()=>{
        const timer = setTimeout(()=>{
       
       
        setUser({offer})
      
        }
        ,500)
    },[user] )
    

    /*state = {id:0, address:"", author:"",serviceToProvid:[],serviceNeeded:[] }*/

    
        
      /*  const timer = setTimeout(()=>{
         if(this.props.location.state.offer != null){  ;
            this.setState(this.props.location.state.offer) ;
        }
       },500) ;*/
      
    return( <React.Fragment>


<label >Categories</label>
    <div >
        
            
           <div className="d-inline-flex">
                <AccordionCategories/>
           </div>
       
        

        <div className="d-flex flex-column float-right w-75 ">
            <div className="ui cards h-100 mb-3  ">
                <div className="card w-100  flex-row box-shadow px-3 py-3"> 
              
                  <div className="user">
                            {/*image*/} 
                       <div className="content">
                          <div className = "pull-left" >
                              <div className="left floated mini ui image">
                                 <img src= {kristy} alt= "{offer.author}" />
                             </div>
                         </div>
     
                           {/*autor */}
                   
                           <div className="header flex-row ">
                              <i className="user icon"></i>
                              Aela
                              <i className="edit icon flex-row ml-1 w-10"></i>
                           </div>
                             {/* adress*/}

                           <div className="meta flex-row">
                             <i className="map marker alternate icon"></i>
                              De vijf eiken 30
                           </div>
                        </div>
     
                                {/* line divider */}
                         <div className="mb-4 text-right">
                       <hr className="solid"/>
                   </div>

                         {/*Array service proposés*/}
                    <div className="service">
                       <label className="text-success fst fst-italic" >Je propose : </label>
                          Cour de math, Anglais, informatique
                          <i className="edit icon flex-row ml-1 w-10"></i>
                    </div>
                         {/*Array service recherchés*/}
                    <div className="service">
                        <label className="text-success fst fst-italic" >Je recherche : </label>
                         yoga ,zumba, cours de maquillage pro
                         <i className="edit icon flex-row ml-1 w-10"></i>
                    </div>
               </div>

               {/*Button*/}
               <div className="extra content">
                    <Link className="ui black basic button w-100" to="/">Me contacter</Link>
                        
                    </div>

                    
        </div>
    </div>

            </div>
                  {/*Button*/}
                <div className="extra content ">
                    <Link className="ui black basic button" to="/">back</Link>
                        
                </div>
        </div>
       </React.Fragment>
       )
   
   
}
export default UserProfil;

   


