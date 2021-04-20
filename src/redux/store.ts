import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import gameReducer from "./reducers/gameReducer";
import pictureReducer from "./reducers/pictureReducer";
import resultReducer from "./reducers/resultReducer";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  game: gameReducer,
  picture: pictureReducer,
  result: resultReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
