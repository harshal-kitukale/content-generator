import { FETCH_CONTENT_FAILURE, FETCH_CONTENT_SUCCESS,LOADING } from "./actionTypes";

// reducers/contentReducer.js
const initialState = {
    content: [],
    error: '',
    loading:""
  };
  
  const contentReducer = (state = initialState, action) => {
      switch (action.type) {
        case LOADING:
          return { ...state, loading:action.payload};
      case FETCH_CONTENT_SUCCESS:
        return { ...state, content: action.payload, error: ''};
      case FETCH_CONTENT_FAILURE:
        return { ...state, content: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default contentReducer;
  