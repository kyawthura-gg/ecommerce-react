import * as React from "react";

import Transition from "./Transition";
import FocusTrap from "./FocusTrap";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

export default function Menu({
  children,
  isStatic = false,
  isClosed,
  setClosed,
}) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    window.location.replace("/login");
  };
  const routeNames = [
    {
      id: "0",
      name: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      id: "1",
      name: "User",
      link: "/admin/user",
    },
    {
      id: "2",
      name: "Categories",
      link: "/admin/category",
    },
    {
      id: "3",
      name: "Sub Categoires",
      link: "/admin/sub-category",
    },
    {
      id: "4",
      name: "Products",
      link: "/admin/product",
    },
    {
      id: "5",
      name: "Orders",
      link: "/admin/order",
    },
  ];
  return (
    <div className="flex h-screen bg-gray-200">
      <Transition
        show={isStatic || !isClosed}
        enter="transition-all duration-500"
        enterFrom="-ml-64"
        enterTo="ml-0"
        leave="transition-all duration-500"
        leaveTo="-ml-64"
      >
        <aside
          className={`z-20 bg-gray-900 w-64 min-h-screen flex flex-col -ml-64 ${
            isStatic ? "" : "fixed"
          }`}
        >
          <FocusTrap isActive={!isStatic}>
            <div className="border-r px-4 h-14 flex items-center justify-between">
              <Link
                to="/admin/dashboard"
                className="text-white text-2xl block px-2 py-2 rounded-md text-base font-medium hover:no-underline"
              >
                E-Commerce
              </Link>

              {!isStatic && (
                <button
                  autoFocus
                  className="w-10 p-1"
                  aria-label="Close menu"
                  title="Close menu"
                  onClick={() => setClosed(true)}
                >
                  <svg
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>

            <div className="border-r py-4 flex-grow relative">
              <nav className="px-2">
                <ul>
                  {routeNames.map((route) => (
                    <li
                      key={route.id}
                      className="mb-2 rounded-md font-medium hover:bg-gray-500 "
                    >
                      <NavLink
                        to={route.link}
                        className="block px-3 py-2.5 text-white hover:no-underline"
                        activeClassName="bg-gray-700 rounded-md"
                      >
                        {route.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </FocusTrap>
        </aside>
      </Transition>

      <Transition
        appear={true}
        show={!isStatic && !isClosed}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-50"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-50"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black opacity-0" />
      </Transition>

      <main className="flex-grow flex flex-col min-h-screen">
        <header className="bg-white border-b h-14 flex items-center">
          {!isStatic && (
            <button
              tabIndex="1"
              aria-hidden={isClosed}
              className="w-10 p-1"
              aria-label="Open menu"
              title="Open menu"
              onClick={() => setClosed(false)}
            >
              <svg
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          )}
          {/* Profile dropdown  */}
          <div className="ml-auto relative mr-4">
            <div>
              <button
                className="max-w-xs rounded-full flex items-center text-lg focus:outline-none"
                id="user-menu"
                aria-haspopup="true"
                onClick={() => setIsOpenProfile(!isOpenProfile)}
              >
                <span className="sr-only">Open user menu</span>
                <i className="fas fa-user"></i>
              </button>
            </div>
            {isOpenProfile && (
              <div className="origin-top-right absolute z-20 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                <Link
                  to="/admin/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </Link>

                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={logoutHandler}
                >
                  Sign out
                </div>
              </div>
            )}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
