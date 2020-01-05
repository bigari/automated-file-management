import React from "react";
import { Box, Container, Paper, Typography } from "@material-ui/core";
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
  }
}));

export default observer(props => {
  const classes = useStyles();
  const store = props.rootStore.questionStore;
  const eid = props.eid;
  store.fetchQuestions(eid);

  return (
    <Container maxWidth="md">
      <Box className={classes.header}>
        <Typography variant="h5">
         Questions & Answers
        </Typography>        
      </Box>
      <Paper>
        <Box className={(store.qas.length)? classes.hide : classes.show}>
          0 Questions
        </Box>
        <Box>
          {
            store.qas.map(question => {
              return <Question question={question} store={store} key={question.id} />;
            })
          }
        </Box>
      </Paper>
    </Container>
  );
});
