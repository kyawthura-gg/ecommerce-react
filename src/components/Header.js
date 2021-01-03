import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Link, Route } from "react-router-dom";
import SearchBox from "./SearchBox";
import Category from "./Category";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  const redirectAdminHanlder = () => {
    window.location.replace("/admin/dashboard");
  };

  return (
    <header>
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <i className="fas fa-store-alt text-3xl"></i>
                </Link>
              </div>
              <div className="block">
                <div className="ml-2 sm:ml-4 md:ml-24 flex items-baseline md:space-x-24">
                  <Route
                    render={({ history }) => <SearchBox history={history} />}
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/cart" className="mr-2">
                  <i className="fas fa-shopping-cart text-lg"></i>
                </Link>

                {/*  Profile dropdown */}
                <div className="ml-3 relative">
                  {userInfo && userInfo.user.is_admin === 0 && (
                    <NavDropdown
                      title={
                        <>
                          <i className="fas fa-user-circle text-lg"></i>
                          <span className="md:hidden">Profile</span>
                        </>
                      }
                      id="username"
                    >
                      <NavDropdown.Item disabled>
                        Hi, {userInfo.user.name}
                      </NavDropdown.Item>

                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>

                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                  {userInfo && userInfo.user.is_admin === 1 && (
                    <div
                      className="cursor-pointer py-2 px-2 text-black"
                      onClick={redirectAdminHanlder}
                    >
                      Admin
                    </div>
                  )}
                  {!userInfo && (
                    <Link to="/login">
                      <i className="fas fa-user text-lg mr-0.5"></i>Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/*  Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="pt-4 pb-3 border-t border-gray-700 bg-gray-100">
            <div className="mb-2 px-2 space-y-1 z-20">
              <Link
                to="/cart"
                className="block px-3 py-2 rounded-md text-black font-medium hover:text-white hover:bg-gray-800"
              >
                <i className="fas fa-shopping-cart mr-2"></i>Cart
              </Link>
            </div>
            {userInfo && !userInfo.user.is_admin && (
              <>
                <div className="flex items-center px-4">
                  <i className="fas fa-user-circle text-2xl"></i>
                  <div className="ml-3">
                    <div className="text-black font-medium leading-none">
                      {userInfo.user.name}
                    </div>
                    <div className="text-sm font-medium leading-none">
                      {userInfo.user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1 z-20">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-black font-medium hover:text-white hover:bg-gray-800"
                  >
                    Your Profile
                  </Link>

                  <div
                    onClick={logoutHandler}
                    className="block px-3 py-2 rounded-md text-black font-medium hover:text-white hover:bg-gray-800"
                  >
                    Sign out
                  </div>
                </div>
              </>
            )}
            {userInfo && userInfo.user.is_admin === 1 && (
              <div className="cursor-pointer mt-3 px-2 space-y-1 z-20">
                <div onClick={redirectAdminHanlder}>Admin</div>
              </div>
            )}
            {!userInfo && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-black font-medium hover:text-white hover:bg-gray-800"
              >
                <i className="fas fa-user mr-2"></i>Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Category />
    </header>
  );
};

export default Header;
