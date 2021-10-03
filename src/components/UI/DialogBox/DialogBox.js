import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = (props) => {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogContent>
        <DialogContentText>
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.dismissLabel ? <Button onClick={props.cancelled}>{props.dismissLabel}</Button> : null}
        {props.confirmLabel ? <Button onClick={props.confirmed}>{props.confirmLabel}</Button> : null}
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
