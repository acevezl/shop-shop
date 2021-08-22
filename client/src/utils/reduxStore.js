import { createStore } from 'redux';
import useProductReducer from './reducers';

const reduxStore = createStore(useProductReducer);
  
export default reduxStore;
