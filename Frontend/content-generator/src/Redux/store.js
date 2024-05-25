// src/index.js
import { legacy_createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import contentReducer from './reducer';

export const store = legacy_createStore(contentReducer, applyMiddleware(thunk));

