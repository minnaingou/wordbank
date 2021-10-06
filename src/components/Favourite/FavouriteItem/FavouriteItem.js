import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotesIcon from "@mui/icons-material/Notes";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { Stack } from "@mui/material";

const FavouriteItem = (props) => {
  let example = null;
  if (props.example) {
    example = (
      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        <Tooltip title="Example">
          <NotesIcon fontSize="small" style={{ fill: "gray" }} />
        </Tooltip>
        <Typography variant="body2" color="text.secondary">
          {props.example}
        </Typography>
      </Stack>
    );
  }

  let note = null;
  if (props.note) {
    note = (
      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        <Tooltip title="Note">
          <CommentIcon fontSize="small" style={{ fill: "gray" }} />
        </Tooltip>
        <Typography variant="body2" color="text.secondary">
          {props.note}
        </Typography>
      </Stack>
    );
  }

  return (
    <Accordion
      expanded={props.expand === props.word}
      onChange={props.expanded(props.word)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" spacing={1}>
          <LabelOutlinedIcon />
          <Typography style={{ fontWeight: "bold" }}>
            {props.word}
          </Typography>{" "}
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{ textTransform: "lowercase", fontStyle: "italic" }}
          >
            ({props.partOfSpeech})
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ textAlign: "left" }}>
        <Typography variant="body2">{props.definition}</Typography>
        {example}
        {note}
        <Stack
          direction="row"
          spacing={1}
          alignItems="right"
          justifyContent="right"
          pt={0}
          pb={0}
        >
          <IconButton onClick={props.edited} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={props.deleted} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default FavouriteItem;
