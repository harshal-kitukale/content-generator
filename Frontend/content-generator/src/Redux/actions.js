// actions/CONTENTActions.js
import axios from "axios";
import { FETCH_CONTENT_FAILURE, FETCH_CONTENT_SUCCESS, LOADING } from "./actionTypes";

const API='https://content-generator-njpj.onrender.com'
export const fetchContent = (prompt) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    // const response = await axios.get(`https://CONTENT-backend-g2l6.onrender.com/CONTENT?prompt=${prompt}`);
    const response = await axios.post(`${API}/content`, {
      prompt: prompt,
    });

    dispatch({ type: FETCH_CONTENT_SUCCESS, payload: response.data.content });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: FETCH_CONTENT_FAILURE,
      payload: error?.response?.data?.error||"Failed to fetch content, try again",
    });
    dispatch({ type: LOADING, payload: false });
  }
};
 