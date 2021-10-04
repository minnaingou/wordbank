import React from "react";
import ReactCardFlip from "react-card-flip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const FlipCard = (props) => {
  const cardContentSx = {
    minHeight: "47vh",
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
            <Typography variant="h5" component="div">
              {props.back.answer}
            </Typography>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </Box>
  );
};

export default FlipCard;
