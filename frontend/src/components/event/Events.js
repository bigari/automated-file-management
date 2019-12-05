import React, { useEffect } from "react";
import EventList from "./EventList";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../NavBar";
import { observer } from "mobx-react";

import { Switch, Route, useRouteMatch } from "react-router-dom";
import Event from "./Event";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "20px",
    marginBottom: "20px"
  }
}));

const Events = observer(props => {
  const userStore = props.userStore;
  const eventStore = props.eventStore;

  let socket = new WebSocket("ws://localhost:5003");

  socket.onopen = function(e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send(
      JSON.stringify({
        url: "events",
        jwt: eventStore.root.userStore.user.jwt,
        verb: "GET"
      })
    );
  };

  socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log("[close] Connection died");
    }
  };

  socket.onerror = function(error) {
    console.log(`[error] ${error.message}`);
  };

  useEffect(() => {
    async function fetchEvents() {
      await eventStore.fetchAll();
      // console.log(eventStore.list);
    }
    fetchEvents();
  }, [eventStore]);

  const events = eventStore.list;
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <div>
          <NavBar userStore={userStore} />
          <Container className="container">
            <Grid container>
              <Typography variant="h6" className={classes.header}>
                Events
              </Typography>
              <EventList events={events} eventStore={eventStore} />
            </Grid>
          </Container>
        </div>
      </Route>
      <Route path={`${path}/:eventId`}>
        <Event eventStore={eventStore} />
      </Route>
    </Switch>
  );
});

export default Events;
