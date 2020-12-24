import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Container,
  Dropdown,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import "../styles/category.css";
import { listCategories } from "../actions/categoryActions";
import Loader from "./Loader";
import Message from "./Message";

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
            <div class="category-nav-container">
              <nav class="all-category-nav">
                <label class="open-menu-all" for="open-menu-all">
                  <input
                    class="input-menu-all"
                    id="open-menu-all"
                    type="checkbox"
                    name="menu-open"
                  />
                  <span class="all-navigator">
                    <i class="fas fa-bars"></i> <span>All category</span>
                    <i class="fas fa-angle-down"></i>
                    <i class="fas fa-angle-up"></i>
                  </span>

                  <ul class="all-category-list">
                    <li class="all-category-list-item">
                      <a href="#" class="all-category-list-link">
                        Smartphones<i class="fas fa-angle-right"></i>
                      </a>
                      <div class="category-second-list">
                        <ul class="category-second-list-ul">
                          <li class="category-second-item">
                            <a href="#">Iphone 10</a>
                          </li>
                          <li class="category-second-item">
                            <a href="#">Galaxy Note 10</a>
                          </li>
                          <li class="category-second-item">
                            <a href="#">Motorola One </a>
                          </li>
                          <li class="category-second-item">
                            <a href="#">Galaxy A80 </a>
                          </li>
                          <li class="category-second-item">
                            <a href="#">Galaxy M </a>
                          </li>
                          <li class="category-second-item">
                            <a href="#">Huaway P30 </a>
                          </li>
                        </ul>
                        <div class="img-product-menu">
                          <img src="https://i.ibb.co/Vvndkmy/banner.jpg" />
                        </div>
                      </div>
                    </li>
                    <li class="all-category-list-item">
                      <a href="#" class="all-category-list-link">
                        Furniture <i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                    <li class="all-category-list-item">
                      <a href="#" class="all-category-list-link">
                        Toys<i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                    <li class="all-category-list-item">
                      <a href="#" class="all-category-list-link">
                        Computing<i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                    <li class="all-category-list-item">
                      <a href="#" class="all-category-list-link">
                        Games<i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                    <li class="all-category-list-item">
                      <a href="" class="all-category-list-link">
                        Automotive<i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </label>
              </nav>
              <nav class="featured-category">
                <ul class="nav-row">
                  <li class="nav-row-list">
                    <a href="#" class="nav-row-list-link">
                      Smartphones
                    </a>
                  </li>
                  <li class="nav-row-list">
                    <a href="#" class="nav-row-list-link">
                      furniture
                    </a>
                  </li>
                  <li class="nav-row-list">
                    <a href="#" class="nav-row-list-link">
                      Toys
                    </a>
                  </li>
                  <li class="nav-row-list">
                    <a href="#" class="nav-row-list-link">
                      Computing
                    </a>
                  </li>
                  <li class="nav-row-list">
                    <a href="#" class="nav-row-list-link">
                      Games
                    </a>
                  </li>
                  <li class="nav-row-list">
                    <a href="#" class="nav-row-list-link">
                      Automotive
                    </a>
                  </li>
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
