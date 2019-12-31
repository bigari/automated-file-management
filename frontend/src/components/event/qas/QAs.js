import React from "react";
import { Box, Container, Paper } from "@material-ui/core";
import Question from "./Question";
import { observer } from "mobx-react";

export default observer((props) => {
  const store = props.rootStore.questionStore;
  store.init();

  return (
    <Container maxWidth="md">
      <Paper>
        <Box>
          {
            store.questions.map(question => {
              return <Question question={question} store={store} key={question.id} />;
            })
          }
        </Box>
      </Paper>
    </Container>
  );
});
