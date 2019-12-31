import React from "react";
import { Box, Container, Paper } from "@material-ui/core";
import Question from "./Question";
import { observer } from "mobx-react";

export default observer((props) => {
  const store = props.rootStore.questionStore;

  return (
    <Container maxWidth="md">
      <Paper>
        <Box>
          {
            store.questions.map(question => {
              return <Question question={question} />;
            })
          }
        </Box>
      </Paper>
    </Container>
  );
});
