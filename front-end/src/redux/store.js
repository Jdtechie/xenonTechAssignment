import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { commonReducer } from "./reducer";
import createSagaMiddleware from "redux-saga";
import mySaga from "./middleware/mysaga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "logined",
  storage,
};

const sagaMiddleware = createSagaMiddleware();
const allMiddlewares = [sagaMiddleware];

const routeReducer = combineReducers({ user: commonReducer });
const persistReducered = persistReducer(persistConfig, routeReducer);
const store = legacy_createStore(
  persistReducered,
  applyMiddleware(...allMiddlewares)
);
sagaMiddleware.run(mySaga);
const persistor = persistStore(store);

export { store, persistor };
