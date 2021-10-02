import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";

const SavedDictionaryItem = (props) => {
  let example = null;
  if (props.example) {
    example = (
      <Typography variant="body2" sx={{ mt: 1.5 }} color="text.secondary">
        Example: {props.example}
      </Typography>
    );
  }
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" spacing={1}>
          <Typography
            style={{ fontWeight: "bold" }}
          >
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

export default SavedDictionaryItem;
