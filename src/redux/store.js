import { createStore, applyMiddleware } from 'redux';
//import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
//import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import userReducer from './reducer';
import { all, call } from 'redux-saga/effects';
import { userSagas } from './sagas';


 function* rootSaga() {
  yield all([call(userSagas)]);
}

const rootReducer = {
    user: userReducer
  };

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

//if (process.env.NODE_ENV === 'development') {
//  middlewares.push(logger);
//}

const store = createStore(userReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

//export const persistor = persistStore(store);

export default store;