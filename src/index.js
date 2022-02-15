import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import "./socket";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Home />
    </Router>
  </Provider>,
  document.getElementById("root")
);
