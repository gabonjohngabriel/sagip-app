import { APPOINTMENT_SET_TYPE, CATEGORY_LIST_REQUEST, CATEGORY_LIST_FAIL } from "./Constants";

export const setDoctorName = (dispatch, doctorName) => {
  return dispatch({
    type: APPOINTMENT_SET_TYPE,
    payload: doctorName,
  });
};

export const listCategories = async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const categories = await fetchCategories(); 
    dispatch({ type: "CATEGORY_LIST_SUCCESS", payload: categories });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.message,
    });
  }
};
