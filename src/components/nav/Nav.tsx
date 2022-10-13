import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <Link to="/" className="nav__logo">
          Logo
        </Link>
      </div>
    </nav>
  );
}
