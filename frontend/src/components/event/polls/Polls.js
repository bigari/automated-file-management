import React, { useState } from "react";
import {
  Container,
  IconButton,
  Button,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Box
} from "@material-ui/core";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";
import {
  DeleteRounded,
  EditRounded,
  AddRounded,
  VisibilityRounded,
  VisibilityOffRounded
} from "@material-ui/icons";
import Poll from "./Poll";
import PollForm from "./PollForm";
import Centered from "../../Centered";

const useStyles = makeStyles(theme => ({
  isUnactive: {
    display: "none"
  },
  borderRight: {
    "border-right": "2px solid #e2e2e1"
  }
}));

export default observer(props => {
  const classes = useStyles();
  const pollStore = props.rootStore.pollStore;
  const userStore = props.rootStore.userStore;
  const eid = props.eid;
  pollStore.fetchPolls(eid);
  let polls;
  if (userStore.isParticipant) {
    polls = pollStore.visibleList;
  }
  polls = pollStore.list;
  const [pollIndex, setPollIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);

  const handleOnCancel = () => {
    setIsFormVisible(false);
    setSelectedPoll(null);
    //setPollIndex(pollIndex);
  };

  const handleShowAddForm = () => {
    if (isFormVisible) {
      return;
    }
    setSelectedPoll(null);
    setIsFormVisible(true);
  };

  const handleShowEditForm = poll => {
    setSelectedPoll(poll);
    setIsFormVisible(true);
  };

  function renderRowPolls(props) {
    const { data, index, style } = props;
    // data holds the polls list
    const toggleVisibility = e => {
      // e.stopPropagation();
      data[index].isVisible = !data[index].isVisible;
      const newPoll = {
        title: data[index].title,
        isVisible: data[index].isVisible
      };
      pollStore.updatePollInServer(eid, data[index].id, newPoll);
    };
    return (
      <ListItem
        button
        style={style}
        key={data[index].id}
        onClick={e => {
          setPollIndex(index);
          setSelectedPoll(null);
          setIsFormVisible(false);
        }}
      >
        <ListItemText primary={`${data[index].title}`} />
        {!userStore.isParticipant && (
          <IconButton onClick={toggleVisibility}>
            {data[index].isVisible ? (
              <VisibilityRounded />
            ) : (
              <VisibilityOffRounded />
            )}
          </IconButton>
        )}
        {!userStore.isParticipant && (
          <IconButton
            onClick={e => {
              e.stopPropagation();
              if (isFormVisible && !selectedPoll) {
                //IsAdding
                return;
              }
              handleShowEditForm(data[index]);
            }}
          >
            <EditRounded />
          </IconButton>
        )}
        {!userStore.isParticipant && (
          <IconButton
            onClick={e => {
              e.stopPropagation();
              pollStore.deletePollFromServer(eid, data[index].id);
              if (pollIndex === index) {
                setPollIndex(null);
              }
            }}
          >
            <DeleteRounded />
          </IconButton>
        )}
      </ListItem>
    );
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          style={{
            backgroundColor: "#efefef"
          }}
          avatar={
            <Button
              color="primary"
              aria-label="Add Poll"
              onClick={handleShowAddForm}
              startIcon={<AddRounded />}
            >
              Add Poll
            </Button>
          }
        ></CardHeader>
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            p={1}
            m={1}
            bgcolor="background.paper"
          >
            {polls.length > 0 ? (
              <Box p={1} className={classes.borderRight}>
                <FixedSizeList
                  height={600}
                  width={360}
                  itemSize={46}
                  itemCount={polls.length}
                  itemData={polls}
                >
                  {renderRowPolls}
                </FixedSizeList>
              </Box>
            ) : (
              <Centered label="Empty Poll List" />
            )}
            {isFormVisible ? (
              <PollForm
                rootStore={props.rootStore}
                eid={eid}
                poll={selectedPoll}
                onCancel={handleOnCancel}
              />
            ) : (
              <Poll
                eid={eid}
                poll={pollIndex!==null ? polls[pollIndex] : null}
                rootStore={props.rootStore}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
});
