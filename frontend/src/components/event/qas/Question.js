import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Menu, MenuItem, Modal } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RepliesModal from "./RepliesModal";
import grey from '@material-ui/core/colors/grey';

const borderColor = grey[300]
const useStyles = makeStyles(theme => ({
  buttons: {
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "0px"
  },
  modal: {
    background: "white",
    padding: "10px",
    border: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));

export default function Question(props) {
  const store = props.store;
  const classes = useStyles();
  const question = props.question;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const footerVisibility = (() => {
    if(props.footer === true || props.footer === undefined){
      return "visible"
    }
    return "none"
  })();

  const showMenu = function(event) {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = function() {
    setAnchorEl(null);
  };
  const reply = function() {};
  const deleteQuest = function() {
    store.deleteQuestion(question.id)
  };

  const openModal = function() {
    setOpen(true);
  };
  const closeModal = function() {
    setOpen(false);
  };

  return (
    <Box p={2} borderTop={1} borderColor={borderColor}>
      <Box pb={1}>Anonymous</Box>
      <Box pb={2}>{new Date(question.timestamp).toLocaleString()}</Box> 
      <Box pb={2}>{question.content}</Box>

      <Box display={footerVisibility}>
        <Box 
        display="flex" 
        flexDirection="row" 
        justifyContent="space-between" 
        >
          <button className={classes.buttons} onClick={openModal}>
            {question.replies.length} replies
          </button>
          <IconButton
            onClick={showMenu}
            disableFocusRipple={true}
            disableRipple={true}
            size="small"
          >
            <MoreHorizIcon />
          </IconButton>

          <Menu
            key="menu"
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            <MenuItem onClick={openModal}>reply</MenuItem>
            <MenuItem onClick={deleteQuest}>delete</MenuItem>
          </Menu>
        </Box>
      </Box>
      
      <Modal open={open} onClose={closeModal}>
        <RepliesModal question={question} store={store}/>
      </Modal>
    </Box>
  );
}
