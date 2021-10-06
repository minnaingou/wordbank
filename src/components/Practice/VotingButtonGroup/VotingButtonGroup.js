import React from "react";
import Fab from "@mui/material/Fab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import BlockIcon from "@mui/icons-material/Block";
import { Stack } from "@mui/material";

import styles from "./VotingButtonGroup.module.css";

const VotingButtonGroup = (props) => {
  const votingButtons = [];
  if (props.flipped) {
    votingButtons.push({
      type: "negative",
      color: "inherit",
      sx: {
        bgcolor: "#EB3941",
        "&:hover": {
          bgcolor: "#EB3941",
        },
      },
      icon: <ThumbDownIcon />,
      clicked: () => {
        props.clicked("negative");
      },
    });
    votingButtons.push({
      type: "skip",
      color: "inherit",
      sx: {
        bgcolor: "#F4BD00",
        "&:hover": {
          bgcolor: "#F4BD00",
        },
      },
      icon: <BlockIcon />,
      clicked: () => {
        props.clicked("skip");
      },
    });
    votingButtons.push({
      type: "positive",
      color: "inherit",
      sx: {
        bgcolor: "#0B8043",
        "&:hover": {
          bgcolor: "#0B8043",
        },
      },
      icon: <ThumbUpIcon />,
      clicked: () => {
        props.clicked("positive");
      },
    });
  } else {
    votingButtons.push({
      type: "reveal",
      color: "primary",
      sx: {
        marginBottom: 1,
      },
      variant: "extended",
      icon: (
        <>
          <VisibilityIcon sx={{ mr: 1 }} />
          REVEAL ANSWER
        </>
      ),
      clicked: () => {
        props.clicked("reveal");
      },
    });
  }

  return (
    <div>
      <Stack direction="row" spacing={2} className={styles.Fab}>
        {votingButtons.map((button) => (
          <Fab
            onClick={button.clicked}
            key={button.type}
            color={button.color}
            variant={button.variant}
            sx={{ ...button.sx, color: "white" }}
          >
            {button.icon}
          </Fab>
        ))}
      </Stack>
    </div>
  );
};

export default VotingButtonGroup;
