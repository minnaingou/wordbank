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
            12/100
          </Typography>
          <Typography
            sx={{ float: "right" }}
            variant="body2"
            color="text.secondary"
          >{`${Math.round(40)}%`}</Typography>
        </div>
        <BorderLinearProgress variant="determinate" value={40} />
      </Stack>
    </div>
  );
};

export default ProgressBar;
