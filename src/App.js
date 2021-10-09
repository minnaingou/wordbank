import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import Dictionary from "./containers/Dictionary/Dictionary";
import WordInput from "./containers/Dictionary/WordInput/WordInput";
import Favourite from "./containers/Favourite/Favourite";
import Statistics from "./containers/Statistics/Statistics";
import About from "./components/About/About";
import Practice from "./containers/Practice/Practice";
import Auth from "./containers/Auth/Auth";
import * as actionCreators from "./store/actions";

const App = (props) => {
  useEffect(() => {
    props.onPageReload();
    // eslint-disable-next-line
  }, []);

  const secureRoutes = [
    <Route
      path="/add-favourite"
      render={(props) => <WordInput {...props} mode="add" />}
    />,
    <Route
      path="/edit-favourite"
      render={(props) => <WordInput {...props} mode="edit" />}
    />,
    <Route path="/saved" component={Favourite} />,
    <Route path="/practice" component={Practice} />,
    <Route path="/statistics" component={Statistics} />,
  ];

  return (
    <div className="App">
      <Layout authenticated={props.isAuthenticated}>
        <Switch>
          <Route path="/" exact component={Dictionary} />
          <Route
            path="/auth/register"
            render={(props) => <Auth {...props} mode="register" />}
          />
          <Route
            path="/auth/login"
            render={(props) => <Auth {...props} mode="login" />}
          />
          <Route path="/auth/logout" component={Logout} />
          <Route path="/about" component={About} />

          {props.isAuthenticated ? secureRoutes.map((route) => route) : null}

          <Redirect to="/auth/login" />
        </Switch>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageReload: () => dispatch(actionCreators.loginStatusCheck()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
