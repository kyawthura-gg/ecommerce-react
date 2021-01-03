import React from "react";
import { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createCategory,
  deleteCategory,
  listCategories,
} from "../../actions/categoryActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { CATEGORY_CREATE_RESET } from "../../constants/categoryConstans";

function CategoryListScreen({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate, category } = categoryCreate;

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET });

    if (!userInfo.user.is_admin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/category/${category.slug}/edit`);
    }
    dispatch(listCategories());
  }, [dispatch, history, userInfo, category, successDelete, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategory(id));
    }
  };
  const createHandler = () => {
    dispatch(createCategory());
  };
  return (
    <>
      <Row className="mb-4">
        <Col>
          <div className="text-2xl text-black mb-2 ml-2">Categories</div>
        </Col>
        <Col className="text-right">
          <Button
            onClick={createHandler}
            className="bg-black text-white px-3.5 py-2.5 rounded"
          >
            Create
          </Button>
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
              <th>Slug</th>
              <th>NAME</th>
              <th>Is Visible</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.slug}>
                <td>{category.id}</td>
                <td>{category.slug}</td>
                <td>{category.name}</td>
                <td className="text-center">
                  {category.is_visible === 1 ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link
                    className="btn"
                    to={`/admin/category/${category.slug}/edit`}
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm text-right"
                    onClick={() => deleteHandler(category.id)}
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

export default CategoryListScreen;
