import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Question from "./Question";
import Reply from "./Reply";
import grey from '@material-ui/core/colors/grey';

const borderColor = grey[300];

const useStyles = makeStyles(theme => ({
  modal: {
    background: "white",
    width: "500px",
    border: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  icon: {
    "margin-left": "10px"
  },
  header: {
    "margin-bottom": "1px",
    padding: "10px",
    "border-bottom": "1px solid #e0e0e0"
  }
}));

const RepliesModal = function(props) {
  const classes = useStyles();
  const question = props.question;

  return (
    <Box class={classes.modal}>
      <div class={classes.header}>
        Replies
      </div>

      <Box style={{maxHeight: 400, overflow: 'auto'}}>
        <Question question={question} footer={false}/>
        <Box bgcolor="#ececeb" mb={2}>
          {question.replies.map(reply => {
            return <Reply reply={reply} />;
          })}
        </Box>
      </Box>

      <Box
        borderTop={0.1}
        borderColor={borderColor}
        px={2}
        pb={2}
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <TextField
          fullWidth={true}
          flexGrow={1}
          id="reply"
          label="Type your reply"
          multiline
          margin="normal"
        />
        <IconButton size="small" classes={{ root: classes.icon }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

module.exports = RepliesModal;
