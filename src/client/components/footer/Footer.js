import React from "react";
import "./footer.css";
function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="raw">
          <div className="col">
            <h4>MEAL SHARING</h4>
            <ul className="lists">
              <li>Ring 233-4444-444</li>
              <li> Odense,Danmark</li>
              <li>Vestagade 94</li>
            </ul>
          </div>
          <div className="col">
            <h4>Social media</h4>
            <ul className="lists">
              <li>
                <a href="http://facebook.com"> Facebook</a>
              </li>
              <li>
                {" "}
                <a href="http://twiter.com"> Twiter</a>
              </li>
              <li>
                <a href="http://intagram.com"> Instagram</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <h4>Extra info</h4>
            <ul className="lists">
              <li>
                <a href="#"> about</a>
              </li>
              <li>
                {" "}
                <a href="#"> Opening hours</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="raw">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} MEAL SHARING|All rights reserved|
            <a href="#">Terms of service</a>|<a href="#">Privecy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
