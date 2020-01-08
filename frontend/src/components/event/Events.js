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
  const rootStore = props.rootStore;
  const eventStore = rootStore.eventStore;
  const userStore = rootStore.userStore;
  
  useEffect(() => {
    async function fetchEvents() {
      await rootStore.eventStore.fetchAll();
      rootStore.questionStore.hasFetched = false;
      rootStore.pollStore.hasFetched = false;
      rootStore.memberStore.hasFetched = false;
    }
    fetchEvents();
  }, [rootStore]);

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
        <Event rootStore={rootStore} />
      </Route>
    </Switch>
  );
});

export default Events;
