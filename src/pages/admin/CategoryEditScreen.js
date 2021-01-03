import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsCategory, updateCategory } from "../../actions/categoryActions";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  CATEGORY_DETAILS_RESET,
  CATEGORY_UPDATE_REQUEST,
} from "../../constants/categoryConstans";

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
    if (updateSuccess) {
      dispatch({ type: CATEGORY_UPDATE_REQUEST });
      dispatch({ type: CATEGORY_DETAILS_RESET });
      history.push("/admin/category");
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
      <div className="flex mb-4">
        <Link
          to="/admin/category"
          className="bg-black text-white px-3.5 py-2.5 rounded hover:no-underline"
        >
          Go Back
        </Link>
        <div className="flex-auto text-center text-2xl text-black mb-2 ml-2">
          Edit Category
        </div>
      </div>
      {updateError && <Message variant="danger">{updateError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="slugName">
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
