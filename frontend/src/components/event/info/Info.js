import React, { useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, IconButton, Typography, Paper } from "@material-ui/core";
import { observer } from "mobx-react";
import { VisibilityRounded, VisibilityOffRounded } from "@material-ui/icons/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  layout: {
    display: "flex",
    justifyContent: "center"
  }
}));

const Info = observer(props => {
  const classes = useStyles();
  const event = props.event;
  const [isDisplayable, setIsDisplayable] = useState(false);
  return (
    <Container maxWidth="md">
      <Paper>
        <div className={classes.layout}>
          <div>
            <Typography variant="h4">
              <p>{event.name}</p>
            </Typography>
            <Typography variant="subtitle1">
              <p>From {new Date(event.startAt).toLocaleString()}</p>
              <p>To {new Date(event.endAt).toLocaleString()}</p>
            </Typography>

            <Box display="flex" alignItems="center">
              <Box mr={4}>
                <Typography variant="h2">
                  {isDisplayable ? <p>{event.accessCode}</p> : <p>- - - - - -</p>}
                </Typography>
              </Box>
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => setIsDisplayable(!isDisplayable)}
                >
                  {isDisplayable ? (
                    <VisibilityOffRounded fontSize="large" />
                  ) : (
                    <VisibilityRounded fontSize="large" />
                  )}
                </IconButton>
              </Box>
            </Box>
          </div>
        </div>
      </Paper>
    </Container>
  );
});

export default Info;
