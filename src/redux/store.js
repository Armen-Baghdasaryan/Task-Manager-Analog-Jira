import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import todoSaga from "./sagas/todoSaga";
import projectSaga from "./sagas/projectSaga";
import { fork } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = (preloadedState) =>
  createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

function* rootSaga() {
  yield fork(todoSaga);
  yield fork(projectSaga);
}

const store = configureStore({});

sagaMiddleware.run(rootSaga);

export default store;
