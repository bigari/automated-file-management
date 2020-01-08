import React, { useState } from "react";
import { Button, Box, TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { FixedSizeList } from "react-window";

export default observer(props => {
  const pollStore = props.rootStore.pollStore;
  const poll = props.poll;
  const eid = props.eid;
  let isEditing = true;
  if (!poll) {
    isEditing = false;
  }
  const [options, setOptions] = useState(
    poll ? poll.options.map(op => op.title) : ["", "", ""]
  );
  const [title, setTitle] = useState(poll ? poll.title : "");

  const addOption = () => {
    const newOptions = options.concat("");
    setOptions(newOptions);
  };

  const writeOption = (index, value) => {
    options[index] = value;
  };

  const cancel = () => props.onCancel();

  const validate = () => {
    if (title === "") {
      return;
    }

    const newPoll = {};
    newPoll.title = title;
    newPoll.options = options
      .filter(opTitle => opTitle !== "")
      .map(opTitle => ({
        title: opTitle,
        isVisible: false
      }));
    if (isEditing) {
      newPoll.isVisible = poll.isVisible;
      pollStore.updatePollInServer(eid, poll.id, newPoll);
      // console.log(newPoll);
    } else {
      pollStore.addPollToServer(eid, newPoll);
      // console.log(newPoll);
    }

    cancel();
  };

  function renderRowOptions(props) {
    const { data, index, style } = props;
    // data holds the polls list
    return (
      <Box style={style}>
        <TextField
          variant="outlined"
          margin="normal"
          name="Option"
          label={`Option ${index + 1}`}
          defaultValue={data[index]}
          onChange={e => {
            writeOption(index, e.target.value);
          }}
          fullWidth
        ></TextField>
      </Box>
    );
  }

  return (
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
      <Box>
        <TextField
          variant="outlined"
          margin="normal"
          name="Title"
          style={{
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          label="Title"
          required
          value={title}
          fullWidth
          onChange={e => {
            setTitle(e.target.value);
          }}
        ></TextField>
      </Box>
      <Box
        p={2}
        style={{
          backgroundColor: "#efefef",
          marginTop: "auto",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <FixedSizeList
          height={270}
          width={400}
          itemSize={90}
          itemCount={options.length}
          itemData={options}
        >
          {renderRowOptions}
        </FixedSizeList>
      </Box>

      <Box
        my={1}
        style={{
          marginBottom: "auto",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Button variant="outlined" onClick={addOption}>
          Add an Option
        </Button>
      </Box>

      <Box
        mx={2}
        style={{
          margin: "auto"
        }}
        display="flex"
        flexDirection="row"
        style={{ justifyContent: "space-between" }}
      >
        <Button variant="contained" onClick={cancel}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={validate}>
          {isEditing ? "Save changes" : "Add Poll"}
        </Button>
      </Box>
    </Box>
  );
});
