import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  Grid,
  TextField,
  Button,
  CardMedia,
  Typography,
  Box
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import { KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  hoverable: {
    cursor: "pointer",
    "&:hover": {
      background: "#DDFFDD"
    }
  },
  card: {
    width: "258px",
    height: "200px",
    "padding-top": "20px",
    "padding-right": "20px",
    "padding-bottom": "12px",
    "padding-left": "20px",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center"
  },
  title: {
    "font-size": "20px",
    "line-height": "5px"
  },
  largeCard: {
    "padding-top": "48px",
    "padding-right": "48px",
    "padding-bottom": "12px",
    "padding-left": "48px",
    "min-width": "400px",
    width: "80%"
  },
  media: {
    height: "50px",
    width: "50px"
  }
}));

const AddEventCard = function(props) {
  const classes = useStyles();
  const eventStore = props.eventStore;
  const [isAdding, setIsAdding] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventStartAt, setEventStartAt] = React.useState(new Date());
  const tomorrow = new Date();
  tomorrow.setHours(tomorrow.getHours() + 2);
  const [eventEndAt, setEventEndAt] = React.useState(tomorrow);

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleCreate = () => {
    const eventData = {
      name: eventName,
      startAt: eventStartAt.toISOString(),
      endAt: eventEndAt.toISOString()
    };
    // console.log(eventData)
    eventStore.create(eventData);
    setEventName("");
    setIsAdding(false);
  };

  const addEvent = () => {
    setIsAdding(true);
  };

  return (
    <Grid item xs={isAdding ? 12 : 3}>
      <Box display="flex" justifyContent="center">
        {isAdding || eventStore.isCreating ? (
          <Box justify="center">
            <Card className={classes.largeCard}>
              <Box pb={2}>
                <Typography variant="subtitle1">Create an Event</Typography>
              </Box>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Event Name"
                name="name"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
                autoFocus
              />
              <Box display="flex" pt={2}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Start Date"
                  value={eventStartAt}
                  onChange={date => setEventStartAt(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />

                <KeyboardTimePicker
                  margin="normal"
                  label="Start Time"
                  value={eventStartAt}
                  onChange={date => setEventStartAt(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </Box>
              <Box display="flex" pt={2} pb={4}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="End Date"
                  value={eventEndAt}
                  onChange={date => setEventEndAt(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />

                <KeyboardTimePicker
                  margin="normal"
                  label="End Time"
                  value={eventEndAt}
                  onChange={date => setEventEndAt(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </Box>

              <CardActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>

                <Button onClick={handleCreate} color="primary">
                  Create
                </Button>
              </CardActions>
            </Card>
          </Box>
        ) : (
          <Card
            className={classes.card + " " + classes.hoverable}
            onClick={() => {
              addEvent();
            }}
          >
            <CardMedia title="Add a event">
              <Add fontSize="large" color="action" />
            </CardMedia>
          </Card>
        )}
      </Box>
    </Grid>
  );
};

export default AddEventCard;
