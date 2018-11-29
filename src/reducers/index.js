import cBookreducer from './cBookReducer'; 
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
  
const store = createStore(cBookreducer, applyMiddleware(thunk));

export default store;