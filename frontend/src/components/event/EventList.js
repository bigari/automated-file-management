import React from 'react';
import { observer } from 'mobx-react';
import EventCard from './EventCard.js';
import AddEventCard from './AddEventCard.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
}));

const EventList = observer(props => {
    const classes = useStyles();
    const events = props.events;
    const eventStore = props.eventStore;
    
    return (
        <Grid container className={classes.root} spacing={2}>
            <AddEventCard eventStore={eventStore} />
            {events.map(event => (
                <Grid item key={event.id}>
                    <EventCard event={event} />
                </Grid>
            ))}
        </Grid>
    )
    
});

export default EventList;