import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listCategoryProducts } from "../actions/categoryActions";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";

const CategoryScreen = ({ match }) => {
  const slug = match.params.slug;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const categoryProductList = useSelector((state) => state.categoryProductList);
  const { loading, error, products, page, pages } = categoryProductList;

  useEffect(() => {
    dispatch(listCategoryProducts(slug, pageNumber));
  }, [dispatch, slug, pageNumber]);

  return (
    <>
      {!slug ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={""} />
        </>
      )}
    </>
  );
};

export default CategoryScreen;
