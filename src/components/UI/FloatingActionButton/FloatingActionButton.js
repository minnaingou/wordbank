import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./FloatingActionButton.module.css";

const FloatingActionButton = (props) => {
  const buttonSx = {
    ...(props.progress &&
      props.progress.success && {
        bgcolor: green[500],
        "&:hover": {
          bgcolor: green[700],
        },
      }),
  };

  const handleButtonClick = () => {
    props.clicked();
  };

  const getButton = () => {
    switch (props.type) {
      case "add":
        return <AddIcon />;
      case "save":
        return props.progress.success ? <CheckIcon /> : <SaveIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <Fab
        color="primary"
        sx={props.showProgress ? buttonSx : null}
        className={styles.Fab}
        disabled={props.disabled}
        onClick={() => {
          !props.progress.success && handleButtonClick();
        }}
      >
        {getButton()}
      </Fab>
      {props.showProgress && props.progress.loading && (
        <CircularProgress
          size={68}
          sx={{
            color: green[500],
            zIndex: 1,
          }}
          className={styles.Progress}
        />
      )}
    </>
  );
};

export default FloatingActionButton;
