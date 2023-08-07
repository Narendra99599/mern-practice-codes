import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const navBarData = [
  {
    id: 1,
    data: "home",
  },
  {
    id: 2,
    data: "catalog",
  },
  {
    id: 3,
    data: "about us",
  },
  {
    id: 4,
    data: "contact us",
  },
];

const NavBar = () => {
  return (
    <div>
      <div className="nav-container">
        <div className="nav-item">Study notion</div>
        <div className="nav-item">
          <ul className="nav-item-links">
            {navBarData.map((obj) => {
              return (
                <li className="nav-link" key={obj.id}>
                  {obj.data}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav-item">
          <Link to={"/login"}>
            <button className="nav-btn">login</button>
          </Link>
          <Link to={"/signup"}>
            <button className="nav-btn">signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
