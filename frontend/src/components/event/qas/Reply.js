import React from "react";
import { Box } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const borderColor = grey[300]

const Reply = function(props) {
  const reply = props.reply;
  return (
    <Box p={2} borderTop={1} borderColor={borderColor}>
      <Box pb={1}>{reply.username} - Moderator</Box>
      <Box pb={2}>{reply.timestamp}</Box>
      <Box pb={1}>{reply.content}</Box>
    </Box>
  );
};

module.exports = Reply;
