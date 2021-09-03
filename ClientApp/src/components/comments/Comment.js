import React from "react";

const Comment = () => {
  return (
    <div>
      <div className="card-body bg-white mx-5 my-4 rounded w-75">
        <div className="d-flex flex-start align-items-center">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="https://mdbootstrap.com/img/Photos/Avatars/img%20(19).jpg"
            alt="avatar"
            width="60"
            height="60"
          />
          <div>
            <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
            <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
          </div>
        </div>

        <p className="mt-3 mb-4 pb-2 text-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip consequat.
        </p>

        <div className="small d-flex justify-content-start">
          <a href="#!" className="d-flex align-items-center me-3">
            <i className="far fa-thumbs-up me-2"></i>
            <p className="mb-0">Like</p>
          </a>
          <a href="#!" className="d-flex align-items-center me-3">
            <i className="far fa-comment-dots me-2"></i>
            <p className="mb-0">Comment</p>
          </a>
          <a href="#!" className="d-flex align-items-center me-3">
            <i className="fas fa-share me-2"></i>
            <p className="mb-0">Share</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Comment;
