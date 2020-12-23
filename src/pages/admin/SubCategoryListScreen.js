import React from "react";
import { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createSubCategory,
  deleteSubCategory,
  listSubCategories,
} from "../../actions/subCategoryActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { SUB_CATEGORY_CREATE_RESET } from "../../constants/subCategoryConstans";

function SubCategoryListScreen({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { loading, error, categories } = subCategoryList;

  const subCategoryDelete = useSelector((state) => state.subCategoryDelete);
  const { success: successDelete } = subCategoryDelete;

  const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
  const { success: successCreate, subCategory } = subCategoryCreate;

  useEffect(() => {
    dispatch({ type: SUB_CATEGORY_CREATE_RESET });

    if (!userInfo.user.is_admin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/subCategory/${subCategory.slug}/edit`);
    }
    dispatch(listSubCategories());
  }, [dispatch, history, userInfo, successDelete, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSubCategory(id));
    }
  };
  const createHandler = () => {
    dispatch(createSubCategory());
  };
  return (
    <>
      <Row>
        <Col>
          <h1>Sub Categories</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={createHandler}>Create</Button>
        </Col>
      </Row>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <Table responsive striped bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Main Category</th>
              <th>Slug</th>
              <th>NAME</th>
              <th>Is Visible</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((subCategory) => (
              <tr key={subCategory.slug}>
                <td>{subCategory.id}</td>
                <td>
                  <Link
                    className="btn"
                    to={`/admin/category/${subCategory.category.slug}/edit`}
                  >
                    {subCategory.category.name}
                  </Link>
                </td>
                <td>{subCategory.slug}</td>
                <td>{subCategory.name}</td>
                <td className="text-center">
                  {subCategory.is_visible === 1 ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link
                    className="btn"
                    to={`/admin/subCategory/${subCategory.slug}/edit`}
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm text-right"
                    onClick={() => deleteHandler(subCategory.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default SubCategoryListScreen;
