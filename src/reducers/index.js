import cBookreducer from './rootReducer';
import { createStore } from 'redux';

const store = createStore(cBookreducer);

export default store;