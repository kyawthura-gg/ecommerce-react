import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/category.css";
import { listCategories } from "../actions/categoryActions";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading, error } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <nav className="py-2 bg-black">
          <div className="container category-nav-container">
            <nav className="all-category-nav bg-white">
              <label className="open-menu-all" htmlFor="open-menu-all">
                <input
                  className="input-menu-all"
                  id="open-menu-all"
                  type="checkbox"
                  name="menu-open"
                />
                <span className="h-5 md:h-10 all-navigator mt-2">
                  <i className="fas fa-bars hidden md:block"></i>{" "}
                  <span>All category</span>
                  <i className="fas fa-angle-down"></i>
                  <i className="fas fa-angle-up"></i>
                </span>

                <ul className="top-9 md:top-14 all-category-list border-black border-2 z-20">
                  {categories.map((category) => (
                    <li className="all-category-list-item" key={category.slug}>
                      <Link
                        to={`/category/${category.slug}`}
                        className="all-category-list-link hover:no-underline"
                      >
                        {category.name}
                        {category.sub_categories.length !== 0 && (
                          <i className="fas fa-angle-right hidden md:block"></i>
                        )}
                      </Link>
                      {category.sub_categories.length !== 0 && (
                        <div className="category-second-list ml-0.5 border-black border-r-2 border-b-2">
                          <ul className="category-second-list-ul">
                            {category.sub_categories.map((subCategory) => (
                              <li
                                className="category-second-item"
                                key={subCategory.slug}
                              >
                                <Link
                                  to={`/category/${subCategory.slug}`}
                                  className="hover:no-underline"
                                >
                                  {subCategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </label>
            </nav>
            <nav className="featured-category pt-1">
              <ul className="nav-row">
                {categories.map((category) => (
                  <li className="nav-row-list" key={category.slug}>
                    <Link
                      to={`/category/${category.slug}`}
                      className="nav-row-list-link text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </nav>
      )}
    </>
  );
};

export default Category;
