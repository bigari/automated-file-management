import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  hoverable: {
    cursor: "pointer",
    "&:hover": {
      background: "#DDFFDD"
    }
  },
  card: {
    minWidth: "100px",
    width: "250px",
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
  media: {
    height: "50px",
    width: "50px"
  }
}));

const AddEventCard = function(props) {
  const classes = useStyles();
  const eventStore = props.eventStore;
  const [isAdding, setIsAdding] = useState(false);
  const [eventName, setWorskspaceName] = useState("");

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleCreate = () => {
    setWorskspaceName("");
    eventStore.create(eventName);
    setIsAdding(false);
  };

  const addEvent = () => {
    console.log("click");
    setIsAdding(true);
  };

  return (
    <Grid item>
      {isAdding || eventStore.isCreating ? (
        <Card className={classes.card}>
          <div>
            <Box my={2}>
              <form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Event Name"
                  name="name"
                  value={eventName}
                  onChange={e => setWorskspaceName(e.target.value)}
                  autoFocus
                />
              </form>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box mr="auto">
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>

              <Button
                variant="contained"
                color="primary"
                disabled={eventName.length === 0 || eventStore.isCreating}
                onClick={handleCreate}
                className={classes.button}
              >
                Create
              </Button>
            </Box>
          </div>
        </Card>
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
    </Grid>
  );
};

export default AddEventCard;
