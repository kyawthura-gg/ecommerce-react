import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsCategory, updateCategory } from "../../actions/categoryActions";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { CATEGORY_UPDATE_REQUEST } from "../../constants/categoryConstans";

const CategoryEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const categorySlug = match.params.slug;

  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { category, loading, error } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success: updateSuccess, error: updateError } = categoryUpdate;

  useEffect(() => {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });
    if (updateSuccess) {
      history.push("/admin/categorylist");
    }
    if (!category || category.slug !== categorySlug) {
      dispatch(detailsCategory(categorySlug));
    } else {
      setSlug(category.slug);
      setName(category.name);
      setIsVisible(category.is_visible);
    }
  }, [dispatch, history, category, categorySlug, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({ id: category.id, slug, name, is_visible: isVisible })
    );
  };
  return (
    <>
      <Row>
        <Col className="my-3">
          <h2>Edit Category</h2>
        </Col>
        <Col className="text-right">
          <Link to="/admin/categorylist" className="btn btn-dark my-3">
            Go Back
          </Link>
        </Col>
      </Row>
      {updateError && <Message variant="danger">{updateError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Slug Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter slug name"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isvisible">
              <Form.Check
                type="checkbox"
                label="Visible In Menu"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default CategoryEditScreen;
