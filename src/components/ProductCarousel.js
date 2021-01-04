import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import { IMAGE_ROUTE } from "../constants/imageConstants";
import { formatNumber } from "../utils/formatNumber";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="bg-gray-100 carousel-container "
      nextIcon={<i className="fas fa-chevron-right text-black text-2xl"></i>}
      prevIcon={<i className="fas fa-chevron-left text-black text-2xl"></i>}
    >
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <div className="flex">
            <div className="flex-none relative">
              <img
                src={IMAGE_ROUTE + product.image}
                alt={product.name}
                className="h-96 w-screen object-fit"
              />
            </div>
            <div className="flex-auto bottom-20 left-16 absolute">
              <div className="ml-7 mt-12 sm:top-0 md:ml-24">
                <div className="text-black text-xl sm:text-2xl md:text-3xl font-bold">
                  {product.name}
                </div>
                <div className="flex flex-wrap">
                  <div className="text-lg ml-1 text-black">from</div>
                  <div className="ml-2 text-black text-2xl sm:text-4xl">
                    ${formatNumber(product.price)}
                  </div>
                </div>
                <div className="mt-12">
                  <Link
                    to={`/product/${product.slug}`}
                    className="text-gray-100 bg-black py-3 px-3 sm:py-3 sm:px-8 text-lg hover:no-underline hover:bg-gray-100"
                  >
                    Shop Now <i className="fas fa-chevron-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
