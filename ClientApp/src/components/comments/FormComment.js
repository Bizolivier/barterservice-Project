import React, { useState,useEffect } from 'react';

const FormComment =()=> {
  
        return (
            <div>
            <div className="card-footer py-3 border-0 w-75">
        <div className="d-flex flex-start w-100">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="https://mdbootstrap.com/img/Photos/Avatars/img%20(19).jpg"
            alt="avatar"
            width="40"
            height="40"
          />
          <div className="form-outline w-100">
            <textarea
              className="form-control"
              id="textAreaExample"
              rows="4"
            ></textarea>
            <label className="form-label" htmlFor="textAreaExample">
              Message
            </label>
          </div>
        </div>
        <div className="float-end mt-2 pt-1">
          <button type="button" className="btn btn-primary btn-sm">
            Post comment
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm">
            Cancel
          </button>
        </div>
      </div>
                
            </div>
        );
    }


export default FormComment;
