import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';

const composeEnhancers = compose;

const store = createStore(appReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;