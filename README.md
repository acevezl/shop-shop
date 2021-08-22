# Redux Store
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This project implements REDUX to replace React's Context API. The ultimate goal of this project is to implement the minimum amount of change to the React code.

## Table of Contents
- [Redux Store](#redux-store)
  - [Table of Contents](#table-of-contents)
  - [What is Redux](#what-is-redux)
  - [Whait but isn't Redux the same as using React Context API?](#whait-but-isnt-redux-the-same-as-using-react-context-api)
  - [Implementing Redux](#implementing-redux)
    - [1. The store](#1-the-store)
    - [2. The reducers](#2-the-reducers)
    - [3. The App](#3-the-app)
    - [4. Updating components](#4-updating-components)
    - [5. Removing GlobalState.js](#5-removing-globalstatejs)
  - [Running the app](#running-the-app)
  - [Questions](#questions)

## What is Redux
Redux is a pattern and library for managing and updating application state, using events called *actions*. Redux works as a centralized *store* for *state* that is needed across an entire application, with *rules* to ensure that the state can only be updated in a predictable way.

In other words, **Redux helps manage the *global* state**. That is, information across many parts of a complex application.

## Whait but isn't Redux the same as using React Context API?
I mean... yes kinda but... keep reading: React's Context API has a short learning curve, it is easy to use, requires less code and doesn't require additional libraries added on our React App. However, it may become cumbersome when working with larger applications or when data operations are more complex. Not to mention React Context API is well... React-native, while we can use Redux across other code bases.

Redux is most helpful when dealing with large amounts of app *state* that is needed in many parts across our application, or when the app *state* is pudated frequently over time. This helps reduce the logic complexity for updating *state* and it is modular enough that it can be used in an environment where many coders are working in the same workspace.

## Implementing Redux
This project is a huge oversimplification but the purpose of the exercise is to implement Redux store to replace the *Global Store* from React's Context API. Here are the steps to follow:

### 1. The store
The Redux Store is the equivalent of React's Context. Therefore, we need to use it to replace *GlobalState*. I've created a new file under `utils` called `reduxStore.js`.

This is the *GlobalState.js* code:
```
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
      products: [],
      categories: [],
      currentCategory: '',
      cart: [],
      cartOpen: false,
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
```
And this is the replacement code, using Redux on `reduxStore.js`:
```
import { createStore } from 'redux';
import useProductReducer from './reducers';

const reduxStore = createStore(useProductReducer);
  
export default reduxStore;

```
Now, as you can see, I'm importing the app `reducers` and creating a Redux store with on these reducers. I'm also exporting this object so I can use it across my app.

### 2. The reducers
On our `reducers.js` file I've made a couple changes to remove ties to React's Context API and replace them with Redux.

First, remove the `useReducer` import, we don't need it anymore. I'm commenting this line out:
```
// Redux refactor
// import { useReducer } from 'react';
```

Second, we'll need to create a `defaultState` object, which will contain the *state* we want to carry across the app:
```
// Redux refactor
const defaultState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
}

export const reducer = (state=defaultState, action) => { [...] }
```
### 3. The App
On `App.js` I'm removing any reference to `GlobalState` (our React *Provider*) and replace them with Redux Provider:

```
// Redux refactor
//import { StoreProvider } from "./utils/GlobalState";

// Redux refactor
import { Provider } from 'react-redux';
import reduxStore from './utils/reduxStore';
```

And, on the main component of App, pass the `reduxStore` to the provider:
```
...

<Provider store={reduxStore}>
    [...]
</Provider>

...
```

### 4. Updating components
Now that we have a *Provider* we will be able to access the Redux Store, which contains the *state*, from any component we want. We'll only need to call this store in a similar way to how we were calling the `GlobalStore`.

On each Page and Component on where the React Context API is used, I've replaced it as follows:

Outside the main component function:
```
// Redux refactor - Remove GlobalState references and replace them with Redux
// import { useStoreContext } from "../../utils/GlobalState";
import { useDispatch, useSelector } from 'react-redux';
```

Inside the main component:
```
  // Redux refactor - state and dispatch are called using our Redux store instead of React Context API
  // const [state, dispatch] = useStoreContext();
  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();
```

### 5. Removing GlobalState.js
At this point it is safe to remove GlobalState.js, as it is not referenced anymore on our app. In this repo you'll see I left the file in, but commented all the code out.

## Running the app
With all changes above, the app is ready and refactored. Now using Redux.
## Questions
E-mail me: <lou.arnaut@gmail.com>
Checkout my Github profile: [acevezl](https://github.com/acevezl)


