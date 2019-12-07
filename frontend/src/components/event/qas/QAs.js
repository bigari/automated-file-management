import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Paper } from "@material-ui/core";
import Question from "./Question";
import { observer } from "mobx-react";


const useStyles = makeStyles(theme => ({
  buttons: {
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "0px"
  }
}));

export default observer(function(props) {
  const classes = useStyles();
  const eid = props.match.params.eid; 
  const store = props.rootStore.questionStore;


  store.fetchQuestions(eid)

  return (
    <Container maxWidth="md">
      <Paper>
        <Box>
          {/* {
            store.questions.map(question => {
              return <Question question={question} />;
            })
          } */}
        </Box>
      </Paper>
    </Container>
    
  );
});
