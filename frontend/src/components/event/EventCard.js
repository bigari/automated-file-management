import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Calendar from "@material-ui/icons/CalendarToday";
import { useHistory } from "react-router-dom";

const isActive = event => {
  const now = new Date();
  return new Date(event.endAt) >= now;
};

const useStyles = makeStyles({
  card: {
    minWidth: "100px",
    width: "250px",
    height: "200px",
    "padding-top": "20px",
    "padding-right": "20px",
    "padding-bottom": "12px",
    "padding-left": "20px",
    cursor: "pointer",
    "&:hover": {
      background: "#E6E2E4"
    }
  },
  title: {
    "font-size": "20px",
    "line-height": "5px"
  },

  date: {
    "text-transform": "capitalize",
    "font-style": "italic"
  },

  active: {
    "background-color": "purple",
    "border-radius": "10px 0px 0px 10px"
  },

  past: {
    "background-color": "grey",
    "border-radius": "10px 0px 0px 10px"
  }
});

const EventCard = function(props) {
  const classes = useStyles();
  const event = props.event;
  const history = useHistory();
  return (
    <Box display="flex">
      <Box
        width={8}
        className={isActive(event) ? classes.active : classes.past}
      />
      <Card className={classes.card} onClick={() => {
        history.push(`/events/${event.id}`)
      }}>
        <CardContent>
          <Box height={100} display="flex" alignItems="center">
            <Box mt={2}>
              <Typography variant="subtitle1">{event.name}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Calendar />
            </Box>
            <Box>
              <Box>
                <Typography variant="caption" className={classes.date}>
                  {new Date(event.startAt).toLocaleString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" className={classes.date}>
                  {new Date(event.endAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventCard;
