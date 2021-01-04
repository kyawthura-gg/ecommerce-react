import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { formatNumber } from "../utils/formatNumber";

const Product = ({ product }) => {
  return (
    <Card className="mb-4 rounded">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="w-100 h-44" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <div className="leading-6 overflow-hidden h-12">{product.name}</div>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            {product.rating} from {product.num_reviews} reviews
          </div>
        </Card.Text>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.num_reviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${formatNumber(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
