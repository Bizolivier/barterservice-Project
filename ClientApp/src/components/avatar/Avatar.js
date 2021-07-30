import React from 'react';
import './Avatar.css';

 export default ({pictureSrc}) => {
     return(
        <div className="personal-image">
           <label className="label">
             <input type="file" />
               <figure className="personal-figure">
                <img src={pictureSrc} className="personal-avatar" alt="avatar"/>
            <figcaption className="personal-figcaption">
              <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"/>
            </figcaption>
          </figure>
        </label>
      </div>
     )

 }
