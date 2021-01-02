import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  detailsSubCategory,
  updateSubCategory,
} from "../../actions/subCategoryActions";
import { listCategories } from "../../actions/categoryActions";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  SUB_CATEGORY_DETAILS_RESET,
  SUB_CATEGORY_UPDATE_REQUEST,
} from "../../constants/subCategoryConstans";

const SubCategoryEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const subCategorySlug = match.params.slug;

  const [categoryId, setCategoryId] = useState(0);
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const subCategoryDetails = useSelector((state) => state.subCategoryDetails);
  const { subCategory, loading, error } = subCategoryDetails;

  const subCategoryUpdate = useSelector((state) => state.subCategoryUpdate);
  const { success: updateSuccess, error: updateError } = subCategoryUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: SUB_CATEGORY_UPDATE_REQUEST });
      dispatch({ type: SUB_CATEGORY_DETAILS_RESET });
      history.push("/admin/sub-category");
    }
    if (!subCategory || subCategory.slug !== subCategorySlug) {
      dispatch(detailsSubCategory(subCategorySlug));
    } else {
      setCategoryId(subCategory.category_id);
      setSlug(subCategory.slug);
      setName(subCategory.name);
      setIsVisible(subCategory.is_visible);
    }
    dispatch(listCategories());
  }, [dispatch, history, subCategory, subCategorySlug, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSubCategory({
        id: subCategory.id,
        category_id: categoryId,
        slug,
        name,
        is_visible: isVisible,
      })
    );
  };
  return (
    <>
      <Row>
        <Col className="my-3">
          <h2>Edit Sub Category</h2>
        </Col>
        <Col className="text-right">
          <Link to="/admin/sub-category" className="btn btn-dark my-3">
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
            {errorCategory ? (
              <Message variant="danger">{errorCategory}</Message>
            ) : loadingCategory ? (
              <Loader />
            ) : (
              <Form.Group controlId="category">
                <Form.Label>Main Category</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setCategoryId(e.target.value)}
                  value={categoryId}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
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

export default SubCategoryEditScreen;
