import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const DictionaryCard = (props) => {
  let example = null;
  if (props.example) {
    example = (
      <Typography variant="body2" sx={{ mt: 1.5 }} color="text.secondary">
        Example: {props.example}
      </Typography>
    );
  }
  return (
    <Card sx={{ minWidth: 275, textAlign: "left", margin: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="save" onClick={props.saved}>
            <FavoriteIcon />
          </IconButton>
        }
        title={props.word}
        subheader={props.partOfSpeech}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography variant="body2">{props.definition}</Typography>
        {example}
      </CardContent>
    </Card>
  );
};

export default DictionaryCard;
