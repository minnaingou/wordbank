import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import * as actionCreators from "../../store/actions";
import { validateEmail } from "../../utils/validator";
import DialogBox from "../../components/UI/DialogBox/DialogBox";

const Auth = (props) => {
  const [form, setForm] = useState({
    email: {
      value: "",
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
    },
  });

  const [errorDialog, setErrorDialog] = useState(false);
  const [validForm, setValidForm] = useState(true);

  const isSignup = props.mode === "register";
  const { error } = props;

  useEffect(() => {
    if (error) {
      setErrorDialog(true);
    }
  }, [error]);

  useEffect(() => {
    let valid = true;
    Object.keys(form).forEach((key) => {
      if (form[key].validation.required && !form[key].value) {
        valid = false;
      }
      if (form[key].validation.email && !validateEmail(form[key].value)) {
        valid = false;
      }
      if (
        form[key].validation.minLength &&
        form[key].value.length < form[key].validation.minLength
      ) {
        valid = false;
      }
    });
    setValidForm(valid);
  }, [form]);

  useEffect(() => {
    // clean up
    return () => {
      props.cleanup();
    };
    // eslint-disable-next-line
  }, []);

  const onChangeHandler = (event, input) => {
    setForm({
      ...form,
      [input]: {
        ...form[input],
        value: event.target.value,
      },
    });
  };

  const onErrorConfirmHandler = () => {
    setErrorDialog(false);
  };

  const onAuthHandler = (event) => {
    event.preventDefault();
    props.authenticate(
      {
        email: form.email.value,
        password: form.password.value,
      },
      isSignup
    );
  };

  const getRedirectUrl = () => {
    const lastUrl = localStorage.getItem("lastUrl");
    return lastUrl ? lastUrl : "/";
  };

  const getButtonText = () => {
    if (props.loading) {
      return isSignup ? "Registering ..." : "Logging in ...";
    } else {
      return isSignup ? "Register" : "Login";
    }
  };

  return (
    <>
      {props.isAuthenticated && <Redirect to={getRedirectUrl()} />}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
          textAlign: "center",
        }}
        noValidate
        autoComplete="off"
        m={3}
      >
        <Typography variant="h6">Welcome to WordBank</Typography>
        <Typography variant="caption" mb={2}>
          {isSignup
            ? "Register now to create your own favourite list and save practice progress across devices."
            : "Login to access your favourite list and continue practicing."}
        </Typography>
        <TextField
          id="email"
          label="Email"
          value={form.email.value}
          type="email"
          onChange={(event) => onChangeHandler(event, "email")}
        />
        <TextField
          id="password"
          label="Password"
          value={form.password.value}
          type="password"
          onChange={(event) => onChangeHandler(event, "password")}
        />
        <Button
          variant="contained"
          disabled={!validForm || props.loading}
          startIcon={isSignup ? <PersonAddIcon /> : <LoginIcon />}
          onClick={onAuthHandler}
        >
          {getButtonText()}
        </Button>
      </Box>

      <Typography variant="caption" mt={4}>
        <Alert severity="info">
          BETA notice! WordBank is currently not checking if the email actually
          exists. You can sign up with anything as long as it looks like an
          email.
        </Alert>
      </Typography>

      {props.error && (
        <DialogBox
          content={props.error.message.replaceAll("_", " ")}
          open={errorDialog}
          dismissLabel="OK"
          cancelled={onErrorConfirmHandler}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (authData, isSignup) =>
      dispatch(actionCreators.authenticate(authData, isSignup)),
    cleanup: () => dispatch(actionCreators.authCleanUp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
