import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import * as actionCreators from "../../../store/actions";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    // eslint-disable-next-line
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actionCreators.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
