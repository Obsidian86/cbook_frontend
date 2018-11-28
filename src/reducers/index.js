import cBookreducer from './cBookReducer'; 
import { createStore } from 'redux';
  
const store = createStore(cBookreducer);

export default store;