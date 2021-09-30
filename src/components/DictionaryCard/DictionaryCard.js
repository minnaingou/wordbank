import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const DictionaryCard = (props) => {
  return (
    <Card sx={{ minWidth: 275, textAlign: "left", margin: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <FavoriteIcon />
          </IconButton>
        }
        title={props.word}
        subheader={props.partOfSpeech}
      />
      <CardContent>
        <Typography variant="body2">{props.definition}</Typography>
      </CardContent>
    </Card>
  );
};

export default DictionaryCard;
