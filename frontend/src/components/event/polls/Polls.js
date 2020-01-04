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
  PlayArrowRounded,
  DeleteRounded,
  EditRounded,
  AddRounded,
  PauseRounded
} from "@material-ui/icons";
import Poll from "./Poll";

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
  const eid = props.eid;
  pollStore.fetchPolls(eid);
  const polls = pollStore.list;
  const [poll, setPoll] = useState(null);
  const [editable, setEditable] = useState(false);

  function renderRowPolls(props) {
    const { data, index, style } = props;
    // data holds the polls list
    return (
      <ListItem
        button
        style={style}
        key={data[index].id}
        onClick={e => {
          setPoll(data[index]);
        }}
      >
        <ListItemText primary={`${data[index].title}`} />
        <IconButton
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <PlayArrowRounded />
        </IconButton>
        <IconButton
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <EditRounded />
        </IconButton>
        <IconButton
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <DeleteRounded />
        </IconButton>
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
              onClick={e => {}}
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
            <Poll
              poll={poll}
              editable={true}
              rootStore={props.rootStore}
            ></Poll>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
});
