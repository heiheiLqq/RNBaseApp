import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}


