import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/freshcart-logo.svg";
import userContext from "../Mycontext/userContext";

function Navbar() {
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/signIn");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div classNameName="div-img">
              <img src={logo} alt="logo" classNameName="w-100" />
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav d-flex flex-row align-content-center align-items-ceneter me-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fcolor"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fcolor" to="/cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fcolor" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fcolor" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fcolor" to="/wishlist">
                      Wishlist
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav mt-1  ms-auto">
              <li className="nav-item mt-2 mx-3">
                <i className="fab  mx-2 fa-facebook face" />
                <i className="fab  mx-2 fa-instagram insta" />
                <i className="fab mx-2  fa-twitter x" />
                <i className="fab mx-2  fa-whatsapp fcolor" />
              </li>

              {token ? (
                <>
                  <li className="nav-item">
                    <span
                      onClick={() => Logout()}
                      className="nav-link fcolor"
                      to="/signOut"
                    >
                      Sign Out
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fcolor" to="/signIn">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item fcolor">
                    <Link className="nav-link" to="/signUp">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
