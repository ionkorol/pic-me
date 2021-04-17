import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import gameReducer from "./reducers/gameReducer";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  game: gameReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
