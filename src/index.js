import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import "./index.css";
import App from "./App";
import dictionaryReducer from "./store/reducers/dictionary";
import favouriteReducer from "./store/reducers/favourite";
import practiceReducer from "./store/reducers/practice";
import reportWebVitals from "./reportWebVitals";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  dictionary: dictionaryReducer,
  favourite: favouriteReducer,
  practice: practiceReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
