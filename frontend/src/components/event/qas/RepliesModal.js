import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Question from "./Question";
import Reply from "./Reply";
import grey from '@material-ui/core/colors/grey';
import { observer } from "mobx-react";


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
    "border-bottom": "1px solid #e0e0e0",
    background: "#e0e0e0",
    fontStyle: "bold"
  }
}));

const RepliesModal = observer(function(props) {
  const classes = useStyles();
  const question = props.question;
  const questionStore = props.store;
  const userStore = props.userStore;
  const [reply, setReply] = React.useState('');
  const [error, setError] = React.useState('');

  const validateReply = function(reply) {
    if(reply === undefined || reply.length === 0) throw new Error("A reply can't be empty.")
    else if(reply.length > 100) throw new Error("The reply is too long, 100 characters max.")
  } 

  const sendReply = function() {
    try{
      setError('')
      validateReply(reply.trim())
      questionStore.sendReply(question.id, reply)
      setReply('')
    }
    catch(e) {
      setError(e.message)
    }
  }

  return (
    <Box className={classes.modal}>
      <div className={classes.header}>
        Replies
      </div>

      <Box style={{maxHeight: 400, overflow: 'auto'}}>
        <Question question={question} footer={false}/>
        <Box bgcolor="#ececeb" mb={2}>
          <Box bgcolor="#ececeb" mb={2}>
          {question.replies.map(reply => {
            return <Reply reply={reply} key={reply.id} />;
          })}
        </Box>
        </Box>
      </Box>

      {
        (!userStore.isParticipant)? (
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
              value={reply ? reply : ''} 
              onChange={event => setReply(event.target.value)}
              id="reply"
              label="Type your reply"
              multiline
              margin="normal"
              helperText={error}
              error={Boolean(error)}
            />
            <IconButton size="small" classes={{ root: classes.icon }} onClick={sendReply}>
              <SendIcon />
            </IconButton>
          </Box>
        ) : ''
      }

      
    </Box>
  );
});

export default RepliesModal;
