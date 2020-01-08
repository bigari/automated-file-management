import React from "react";
import { Box, Container, Paper, Typography, Modal, Button, TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Question from "./Question";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
  
const useStyles = makeStyles(theme => ({
  show: {
    display: "flex",
    justifyContent: "center",
    padding: "10px"
  },
  hide: {
    display: "none"
  },
  header: {
    paddingTop: "10px",
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modal: {
    padding: "20px",
    background: "white",
    width: "500px",
    border: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
}));

export default observer(props => {
  const classes = useStyles()
  const store = props.rootStore.questionStore
  const userStore = props.rootStore.userStore
  const [open,setOpen] = React.useState(false)
  const [question, setQuestion] = React.useState('')
  const eid = props.eid
  store.fetchQuestions(eid)

  const openModal = function() {
    setOpen(true);
  };
  const closeModal = function() {
    setOpen(false);
  };
  const sendQuestion = function() {
    if(question && !question.length == 0 && question.length < 100) {
      store.sendQuestion(question.trim())
      closeModal()
    }
  }

  return (
    <Container maxWidth="md">
      <Box className={classes.header}>
        <Typography variant="h5">
         Questions & Answers
        </Typography>     
        {
          (userStore.isParticipant)? (
            <IconButton size="small" classes={{ root: classes.icon }} onClick={openModal}>
              <SendIcon />
            </IconButton>
          ) : ''
        }
      </Box>
      <Paper>
        <Box className={(store.qas.length)? classes.hide : classes.show}>
          0 Questions
        </Box>
        <Box>
          {
            store.qas.map(question => {
              return <Question question={question} store={store} userStore={userStore} key={question.id} />;
            })
          }
        </Box>
      </Paper>

      <Modal open={open} onClose={closeModal}>
        <Box className={classes.modal}>
          <Box
            px={1}
            pb={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-end"
          >
            <TextField
              fullWidth={true}
              value={question ? question : ''} 
              onChange={event => setQuestion(event.target.value)}
              id="reply"
              label="Type your question"
              multiline
              margin="normal"
              variant="outlined"
              // helperText={error}
              // error={Boolean(error)}
            />
            <Button onClick={sendQuestion}>
              Send 
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
});
