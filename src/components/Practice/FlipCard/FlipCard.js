import React from "react";
import ReactCardFlip from "react-card-flip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import NotesIcon from "@mui/icons-material/Notes";

const FlipCard = (props) => {
  const cardContentSx = {
    minHeight: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardSx = {
    boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.2)",
  };

  return (
    <Box sx={{ margin: 3, alignItems: "center" }}>
      <ReactCardFlip isFlipped={props.flip} flipDirection="horizontal">
        <Card sx={cardSx}>
          <CardContent sx={cardContentSx}>
            <Typography variant="h5" component="div">
              {props.front.question}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={cardSx}>
          <CardContent sx={cardContentSx}>
            <Stack direction="column">
              <Typography variant="h5" component="div">
                {props.back.word}
              </Typography>
              <Typography mt={2} variant="body2">
                {props.back.definition}
              </Typography>
              {props.back.example ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1.5, justifyContent: "center" }}
                >
                  <NotesIcon fontSize="small" style={{ fill: "gray" }} />
                  <Typography variant="body2" color="text.secondary">
                    {props.back.example}
                  </Typography>
                </Stack>
              ) : null}
              {props.back.note ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1, justifyContent: "center" }}
                >
                  <CommentIcon fontSize="small" style={{ fill: "gray" }} />
                  <Typography variant="body2" color="text.secondary">
                    {props.back.note}
                  </Typography>
                </Stack>
              ) : null}
            </Stack>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </Box>
  );
};

export default FlipCard;
