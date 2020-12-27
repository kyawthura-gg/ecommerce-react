import React, { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
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
        <Navbar
          bg="light"
          variant="dark"
          expand="lg"
          collapseOnSelect
          className="py-2"
        >
          <Container>
            <div className="category-nav-container">
              <nav className="all-category-nav">
                <label className="open-menu-all" htmlFor="open-menu-all">
                  <input
                    className="input-menu-all"
                    id="open-menu-all"
                    type="checkbox"
                    name="menu-open"
                  />
                  <span className="all-navigator">
                    <i className="fas fa-bars"></i> <span>All category</span>
                    <i className="fas fa-angle-down"></i>
                    <i className="fas fa-angle-up"></i>
                  </span>

                  <ul className="all-category-list">
                    {categories.map((category) => (
                      <li
                        className="all-category-list-item"
                        key={category.slug}
                      >
                        <Link
                          to={`/category/${category.slug}`}
                          className="all-category-list-link"
                        >
                          {category.name}
                          {category.sub_categories.length !== 0 && (
                            <i className="fas fa-angle-right"></i>
                          )}
                        </Link>
                        {category.sub_categories.length !== 0 && (
                          <div className="category-second-list">
                            <ul className="category-second-list-ul">
                              {category.sub_categories.map((subCategory) => (
                                <li
                                  className="category-second-item"
                                  key={subCategory.slug}
                                >
                                  <Link to={`/category/${subCategory.slug}`}>
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
              <nav className="featured-category">
                <ul className="nav-row">
                  {categories.map((category) => (
                    <li className="nav-row-list" key={category.slug}>
                      <Link
                        to={`/category/${category.slug}`}
                        className="nav-row-list-link"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Category;
