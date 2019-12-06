import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Question from "./Question";

const useStyles = makeStyles(theme => ({
  buttons: {
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "0px"
  }
}));

export default function IconButtons() {
  const classes = useStyles();
  const question = {
    user: "Rahal",
    timestamp: "2019-12-05T16:42:57.539Z",
    content: "This is content",
    replies: [
      {
        username: "Anonymous",
        content: "This is a reply",
        timestamp: "2019-12-05T16:42:57.539Z"
      },
      {
        username: "Anonymous",
        timestamp: "2019-12-05T16:42:57.539Z",
        content: "This is a second reply"
      },
      {
        username: "Anonymous",
        timestamp: "2019-12-05T16:42:57.539Z",
        content: "This is a second reply"
      }
    ]
  };

  const questions = [question, question];
  return (
    <Box>
      {questions.map(question => {
        return <Question question={question} />;
      })}
    </Box>
  );
}
