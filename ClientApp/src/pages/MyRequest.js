import React from 'react';
import { Link } from 'react-router-dom';



export default () => {
 
  return (
   <div  >
     <div className = "ui segment ">
      <div className ="ui item">
              <div className ="ui fluid selection dropdown">
                <div className ="text">More</div>
                  <i className ="dropdown icon"></i>
                  <div className ="menu">
                    <div className ="item">Choice 1</div>
                    <div className ="item">Choice 2</div>
                    <div className ="item">Choice 3</div>
                </div>
              </div>
            </div>
            </div>



   <Link className ="ui black basic button" to ="/">back</Link>
   </div>
  );
}


