import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const EmptyPage = (props) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{ padding: 5, paddingBottom: 10, ...props.sx }}
    >
      <img
        style={{ width: "50%", borderRadius: "50%" }}
        src={process.env.PUBLIC_URL + "/parrot-3.png"}
        alt="logo"
      />
      <Typography variant="overline" gutterBottom m={2}>
        {props.message}
      </Typography>
    </Stack>
  );
};

export default EmptyPage;
