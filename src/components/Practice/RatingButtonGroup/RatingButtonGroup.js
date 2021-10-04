import React from "react";
import Fab from "@mui/material/Fab";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import BlockIcon from "@mui/icons-material/Block";
import { Stack } from "@mui/material";

import styles from "./RatingButtonGroup.module.css";

const RatingButtonGroup = (props) => {
  const ratingButtons = [];
  if (props.flipped) {
    ratingButtons.push({
      name: "negative",
      color: "inherit",
      sx: {
        bgcolor: "#ff1744",
        "&:hover": {
          bgcolor: "#ff1744",
        },
      },
      icon: <ThumbDownIcon />,
      clicked: () => {
        props.clicked();
      },
    });
    ratingButtons.push({
      name: "skip",
      color: "inherit",
      sx: {
        bgcolor: "#ffc400",
        "&:hover": {
          bgcolor: "#ffc400",
        },
      },
      icon: <BlockIcon />,
      clicked: () => {
        props.clicked();
      },
    });
    ratingButtons.push({
      name: "positive",
      color: "inherit",
      sx: {
        bgcolor: "#00a152",
        "&:hover": {
          bgcolor: "#00a152",
        },
      },
      icon: <ThumbUpIcon />,
      clicked: () => {
        props.clicked();
      },
    });
  } else {
    ratingButtons.push({
      name: "reveal",
      color: "primary",
      variant: "extended",
      icon: (
        <>
          <AutorenewIcon sx={{ mr: 1 }} />
          Reveal
        </>
      ),
      clicked: () => {
        props.clicked();
      },
    });
  }

  return (
    <div>
      <Stack direction="row" spacing={2} className={styles.Fab}>
        {ratingButtons.map((button) => (
          <Fab
            onClick={button.clicked}
            key={button.name}
            color={button.color}
            variant={button.variant}
            sx={{ ...button.sx, color: "white" }}
          >
            {button.icon}
          </Fab>
        ))}
        ;
      </Stack>
    </div>
  );
};

export default RatingButtonGroup;
