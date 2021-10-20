import React from 'react';
import './Avatar.css';

export default ({ pictureSrc }) => {
  return (
    <div className="personal-image">
      <label className="label">
        <figure className="personal-figure">
          <img src={pictureSrc} className="personal-avatar" alt="avatar" />
        </figure>
      </label>
    </div>
  )

}
