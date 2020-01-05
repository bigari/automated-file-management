import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  IconButton,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon
} from "@material-ui/core";
import { observer } from "mobx-react";
import { FixedSizeList } from "react-window";
import { HowToVoteRounded, CheckRounded } from "@material-ui/icons";
import Centered from "../../Centered";

const genColor = (id, len) => {
  id = parseInt(id) * Math.floor(256 / len);
  const b = id % 256;
  const g = (256 - id) % 256;
  const r = Math.floor(128 + id) % 256;
  return `rgba(${r},${g},${b},0.6)`;
};

const totalVotes = options =>
  options.reduce((acc, op) => acc + parseInt(op.voteCount), 0);

export default observer(props => {
  const pollStore = props.rootStore.pollStore;
  const poll = props.poll;
  const eid = props.eid;

  function renderRowOptions(props) {
    const { data, index, style } = props;
    // data holds the polls list
    return (
      <ListItem style={style} key={data[index].id}>
        <ListItemIcon>
          <CheckRounded
            style={{
              color: poll.choice === data[index].id ? "green" : "#e2e2e2"
            }}
          ></CheckRounded>
        </ListItemIcon>
        <ListItemText primary={`${index + 1}-`} />
        <ListItemText primary={`${data[index].title}`} />
        <IconButton
          onClick={e => {
            e.stopPropagation();
            pollStore.voteInServer(eid, poll.id, data[index].id);
          }}
        >
          <HowToVoteRounded></HowToVoteRounded>
        </IconButton>
      </ListItem>
    );
  }

  return poll !== null ? (
    <Box
      p={1}
      pl={2}
      style={{
        width: "100%"
      }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Box mt={2} textAlign="center">
        {poll.title}
      </Box>
      <FixedSizeList
        height={250}
        width={400}
        style={{
          margin: "auto"
        }}
        itemSize={46}
        itemCount={poll.options.length}
        itemData={poll.options}
      >
        {renderRowOptions}
      </FixedSizeList>
      <Box>
        {totalVotes(poll.options) > 0 ? (
          <Doughnut
            data={{
              labels: poll.options.map((_, i) => i + 1),
              datasets: [
                {
                  backgroundColor: poll.options.map(op =>
                    genColor(op.id, poll.options.length)
                  ),
                  label: "Votes",
                  data: poll.options.map(op => parseInt(op.voteCount))
                }
              ]
            }}
          />
        ) : (
          <Box p={1} textAlign="center" bgcolor="grey.300">
            No vote yet
          </Box>
        )}
      </Box>
    </Box>
  ) : (
    <Centered label="No active poll" />
  );
});
