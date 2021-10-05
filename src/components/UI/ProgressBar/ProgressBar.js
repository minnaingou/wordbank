import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const ProgressBar = (props) => {
  const progressPercent = Math.round(((props.current - 1) * 100) / props.total);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Stack
        sx={{
          flexGrow: 1,
          marginLeft: 3,
          marginRight: 3,
        }}
        direction="column"
      >
        <div>
          <Typography
            sx={{ float: "left" }}
            variant="body2"
            color="text.secondary"
          >
            {props.current}/{props.total}
          </Typography>
          <Typography
            sx={{ float: "right" }}
            variant="body2"
            color="text.secondary"
          >{`${progressPercent}%`}</Typography>
        </div>
        <BorderLinearProgress variant="determinate" value={progressPercent} />
      </Stack>
    </div>
  );
};

export default ProgressBar;
