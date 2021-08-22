import { createStore } from 'redux';
import useProductReducer from './reducers';

const defaultState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
}

const reduxStore = createStore(useProductReducer, defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
  
export default reduxStore;
