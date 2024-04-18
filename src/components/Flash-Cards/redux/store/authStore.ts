import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/authReducer';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware()

));

export default store;
