import React from "react";

function footer() {
  return (
    <div className="w-100 foter mt-5 bottom-0">
      <div className="container mt-5 pb-4 pt-1">
        <div className="form w-100">
          <div className="mt-1 mb-3 fs-4 fcolor">Get FreshCart App</div>
          <div className="text-muted">
            We will send you an Email with a link to Download Our App
          </div>
          <div className="d-flex mt-2 flex-column gap-2 flex-md-row justify-content-between align-content-center ">
            <div className="col-11 col-md-9">
              <input
                name="email"
                type="text"
                className="form-control"
                placeholder="email us"
              />
            </div>
            <div className="btn fs-6 fs-md-5 col-5 col-md-2">Share App</div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row gap-3 align-content-center align-items-center mt-2">
          <div className="fs-5 fcolor rounded-5">
            Contact Us on Our Social Media
          </div>
          <div className="d-flex flex-row align-content-center align-items-center gap-2">
            <i className="fs-4  fab mx-2 fa-facebook face" />
            <i className="fs-4  fab mx-2 fa-instagram insta" />
            <i className="fs-4 fab mx-2  fa-twitter x" />
            <i className="fs-4 fab mx-2  fa-whatsapp fcolor" />
          </div>
        </div>
        <div className="fs-6 mt-3 text-muted">
          All copyrights preserved by Ahmed Magdy @2023
        </div>
      </div>
    </div>
  );
}

export default footer;
