import React from "react";
import { Link } from "react-router-dom";

import "./header.css";
const pictureConstractor = new URL("./../../assets/logo.jpeg", import.meta.url);

export function Header() {
  return (
    <nav className="nave">
      <div className="logo">
        <img src={pictureConstractor} alt="" />
        <div> Meal Sharing</div>
      </div>

      <ul className="nave-lists">
        <Link to={"/"}>
          <li>
            <div>Home</div>
          </li>
        </Link>
        <Link to={"/about"}>
          <li>About</li>
        </Link>
        <Link to={"/meals/1"}>
          <li>Reserv</li>
        </Link>

        <Link to={"/meals"}>
          <li>Mealpages</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Header;
