import React from 'react';
import './Avatar.css';

 export default ({pictureSrc}) => {
     return(
        <div class="personal-image">
           <label class="label">
             <input type="file" />
               <figure class="personal-figure">
                <img src={pictureSrc} class="personal-avatar" alt="avatar"/>
            <figcaption class="personal-figcaption">
              <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"/>
            </figcaption>
          </figure>
        </label>
      </div>
     )

 }
