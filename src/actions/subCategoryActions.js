import axios from "axios";
import {
  SUB_CATEGORY_LIST_FAIL,
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
  SUB_CATEGORY_DELETE_REQUEST,
  SUB_CATEGORY_DELETE_SUCCESS,
  SUB_CATEGORY_DELETE_FAIL,
  SUB_CATEGORY_CREATE_REQUEST,
  SUB_CATEGORY_CREATE_SUCCESS,
  SUB_CATEGORY_CREATE_FAIL,
  SUB_CATEGORY_DETAILS_REQUEST,
  SUB_CATEGORY_DETAILS_SUCCESS,
  SUB_CATEGORY_DETAILS_FAIL,
  SUB_CATEGORY_UPDATE_REQUEST,
  SUB_CATEGORY_UPDATE_SUCCESS,
  SUB_CATEGORY_UPDATE_FAIL,
} from "../constants/subCategoryConstans";

export const listSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: SUB_CATEGORY_LIST_REQUEST });
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    const { data } = await axios.get("/api/subCategories", config);

    dispatch({
      type: SUB_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategory = (id) => async (disptach, getState) => {
  try {
    disptach({ type: SUB_CATEGORY_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };
    await axios.delete(`/api/subCategories/${id}`, config);

    disptach({ type: SUB_CATEGORY_DELETE_SUCCESS });
  } catch (error) {
    disptach({
      type: SUB_CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSubCategory = () => async (disptach, getState) => {
  try {
    disptach({ type: SUB_CATEGORY_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };
    const { data } = await axios.post("/api/subCategories", {}, config);

    disptach({ type: SUB_CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    disptach({
      type: SUB_CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsSubCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUB_CATEGORY_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };
    const { data } = await axios.get(`/api/subCategories/${id}`, config);

    dispatch({ type: SUB_CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSubCategory = (subCategory) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUB_CATEGORY_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    await axios.put(`/api/subCategories/${subCategory.id}`, subCategory, config);

    dispatch({ type: SUB_CATEGORY_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
