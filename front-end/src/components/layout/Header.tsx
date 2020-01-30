import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

const Header: React.FC = () => (
  <header className="container-fluid">
    <Link to="/">
      <img
        src={Logo}
        className="mx-auto d-block"
        alt="MYtinerary Logo"
        style={{ maxWidth: "250px" }}></img>
    </Link>
  </header>
);

export default Header;