import React, { useEffect } from "react";
import EventList from "./EventList";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../NavBar";
import { observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "20px",
    marginBottom: "20px"
  }
}));

const Events = observer(props => {
  const userStore = props.userStore;
  const eventStore = props.eventStore;

  useEffect(() => {
    async function fetchEvents() {
      await eventStore.fetchAll();
      // console.log(eventStore.list);
    }
    fetchEvents();
  }, [eventStore]);

  const events = eventStore.list;
  const classes = useStyles();

  return (
    <div>
      <NavBar userStore={userStore} />
      <Container className="container">
        <Grid container>
          <Typography variant="h6" className={classes.header}>
            Events
          </Typography>
          <EventList events={events} eventStore={eventStore}/>
        </Grid>
      </Container>
    </div>
  );
});

export default Events;
